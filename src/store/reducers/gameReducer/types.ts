export type TGameState = {
  player: TUserScoresData;
};
export type TUserScoresData = {
  scores: number;
  kills: number;
};

export enum EGameActions {
  SET_SCORE = "SET_SCORE",
}
export interface ISetScoreAction {
  type: EGameActions.SET_SCORE;
  payload: TUserScoresData;
}

export type TGameAction = ISetScoreAction;
