import { gameReducer } from './gameReducer';
import { forumReducer } from './forumReducer';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { fetchReducer } from './fetchReducer';
import { leaderBoardReducer } from './leaderBoardReducer';
import { profileReducer } from './profileReducer';
import { History, LocationState } from 'history';


export const createRootReducer = (history: History<LocationState>) => combineReducers({
  authReducer,
  fetchReducer,
  leaderBoardReducer,
  profileReducer,
  forumReducer,
  router: connectRouter(history),
  gameReducer,
});
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
