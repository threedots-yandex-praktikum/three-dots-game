import { EForumActions, TForumAction, TForumState } from "./types";

const initialState: TForumState = {
  currentTopic: null,
  topics: null,
};

export const forumReducer = (
  state: TForumState = initialState,
  action: TForumAction
): TForumState => {
  switch (action.type) {
    case EForumActions.SET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    case EForumActions.SET_CURRENT_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    default:
      return state;
  }
};
