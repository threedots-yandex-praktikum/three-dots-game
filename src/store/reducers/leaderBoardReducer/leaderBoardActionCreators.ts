import {
  ELeaderActions,
  IAddUserToLBAction,
  IGetTableAction,
  TLeaderRow,
} from "./types";

export const getTableAC = (): IGetTableAction => {
  return { type: ELeaderActions.GET_TABLE };
};
export const setTableAC = (data: TLeaderRow[]) => {
  return { type: ELeaderActions.SET_TABLE, payload: data };
};

export const addUserToTableAC = (): IAddUserToLBAction => {
  return {
    type: ELeaderActions.ADD_USER_TO_LB,
  };
};
