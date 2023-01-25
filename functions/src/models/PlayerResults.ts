/**
 * Represents the Player Ranking Results.
 */
export default class PlayerResults {
  position: number;
  playerName: string;
  finalScore: number;

  /**
   * @constructor
   */
  constructor() {
    this.playerName = "";
    this.finalScore = 0;
    this.position = 0;
  }
}
