import { forumReducer } from './forumReducer/index';
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { fetchReducer } from './fetchReducer';
import { leaderBoardReducer } from './leaderBoardReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
  authReducer,
  fetchReducer,
  leaderBoardReducer,
  profileReducer,
  forumReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
