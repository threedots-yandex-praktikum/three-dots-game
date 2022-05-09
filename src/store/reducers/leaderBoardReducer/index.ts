import { ELeaderActions, TLeaderBoardActions, TLeaderState } from "./types";

const initialState: TLeaderState = {
  leaders: [],
};

export const leaderBoardReducer = (
  state: TLeaderState = initialState,
  action: TLeaderBoardActions
) => {
  switch (action.type) {
    case ELeaderActions.SET_TABLE:
      return { ...state, leaders: action.payload };
    default:
      return state;
  }
};
