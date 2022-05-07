import { ELeaderActions, TLeaderState } from "./types";

const initialState: TLeaderState = {
  state: null,
};

export const leaderBoardReducer = (
  state: TLeaderState = initialState,
  action: { type: any }
) => {
  switch (action.type) {
    case ELeaderActions.SET_TABLE:
      return state;
    default:
      return state;
  }
};
