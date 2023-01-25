/* eslint-disable operator-linebreak */
import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Player from "./models/Player";
import PlayerResults from "./models/PlayerResults";
import _ = require("lodash");

admin.initializeApp();

export const rankingUser = functions.https.onRequest(
    async (request, response) => {
      functions.logger
          .info("Log - ----------------------------");
      functions.logger.info(request.params);
      functions.logger
          .info("---------------------------------");

      const refData = admin.database().ref();
      const userId = request.query?.userId;

      if (!userId) {
        response.send({message: "No user informed"});
        return;
      }

      refData
          .child("Player")
          .child(userId.toString()).get().then((dataSnapShot) => {
            response.send(<Player>dataSnapShot.val());
          });
    }
);

export const worldRanking = functions.https.onRequest(
    async (request, response) => {
      functions.logger.info("Users Rankings", {structuredData: true});
      const refData = admin.database().ref();

      refData
          .child("Player")
          .get().then((dataSnapShot) => {
            const listPlayers = <Player[]>_.toArray(dataSnapShot.val());
            const listPlayerRemaps = listPlayers
                .map((row) => {
                  return <PlayerResults> {
                    playerName: row.name,
                    finalScore: row.scores == null
                      ? 0
                      : row.scores?.map((x) => x.points)
                          .reduce((a, b) => a + b, 0),
                  };
                });

            response.send(
                listPlayerRemaps.sort((a, b) => b.finalScore - a.finalScore)
                    .slice(0, 5)
                    .map((row, index) => {
                      row.position = ++index;
                      return row;
                    })
            );
          });
    }
);
