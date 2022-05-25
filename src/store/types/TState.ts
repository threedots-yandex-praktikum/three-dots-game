import { TAuthState } from '../reducers/authReducer/types';
import { TStateFetch } from '../reducers/fetchReducer/types';
import { TForumState } from '../reducers/forumReducer/types';
import { TLeaderState } from '../reducers/leaderBoardReducer/types';
import { TProfileState } from '../reducers/profileReducer/types';
import {RouterState} from "connected-react-router";

export type State = {
  authPage: TAuthState,
  fetch: TStateFetch,
  forumPage: TForumState,
  leaderBoardPage: TLeaderState,
  profilePage: TProfileState,
  router: RouterState,
}
