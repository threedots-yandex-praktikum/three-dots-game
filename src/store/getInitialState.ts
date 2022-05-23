import { State } from './types/TState';
import { initialState as authPage } from './reducers/authReducer';
import { initialState as fetch } from './reducers/fetchReducer';
import { initialState as forumPage } from './reducers/forumReducer';
import { initialState as leaderBoardPage } from './reducers/leaderBoardReducer';
import { initialState as profilePage } from './reducers/profileReducer';

export const getInitialState = (): State => {
  return {
    authPage,
    fetch,
    forumPage,
    leaderBoardPage,
    profilePage,
  };
};
