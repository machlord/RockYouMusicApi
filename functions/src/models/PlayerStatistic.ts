interface PlayerStatistic {
  userId : string;
  stageName : string;
  startTime : string;
  finishTime : string;
  skipped: boolean;
  restarted: boolean;
  returnedToMenu: boolean;
  clickCount: number;
}
export default PlayerStatistic;
