import { EGameActions, ISetScoreAction, TUserScoresData } from "./types";

export const setScoreAC = ({
  scores,
  kills,
}: TUserScoresData): ISetScoreAction => {
  return { type: EGameActions.SET_SCORE, payload: { scores, kills } };
};
