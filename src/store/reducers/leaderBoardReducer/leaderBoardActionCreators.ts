import { ELeaderActions, TLeaderRow } from "./types";

export const getTableAC = () => {
  return { type: ELeaderActions.GET_TABLE };
};
export const setTableAC = (data: TLeaderRow[]) => {
  return { type: ELeaderActions.SET_TABLE, payload: data };
};
