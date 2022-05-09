export enum ELeaderActions {
  SET_TABLE = 'SET_TABLE',
  GET_TABLE = 'GET_TABLE',
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

export type TLeaderBoardActions = IGetTableAction | ISetTableAction;
