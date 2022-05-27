import { TAddToLBData } from "../../../modules/api/leaderBoardAPI";

export enum ELeaderActions {
  SET_TABLE = "SET_TABLE",
  GET_TABLE = "GET_TABLE",
  ADD_USER_TO_LB = "ADD_USER_TO_LB",
}
export type TLeaderState = {
  leaders: [] | TLeaderRow[];
};
export type TLeaderRow = {
  id: number;
  userName: string;
  score: number;
};

export interface IGetTableAction {
  type: ELeaderActions.GET_TABLE;
}

export interface ISetTableAction {
  type: ELeaderActions.SET_TABLE;
  payload: TLeaderRow[];
}
export interface IAddUserToLBAction {
  type: ELeaderActions.ADD_USER_TO_LB;
  payload: TAddToLBData;
}

export type TLeaderBoardActions =
  | IGetTableAction
  | ISetTableAction
  | IAddUserToLBAction;
