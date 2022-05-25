import {initialState as authReducer} from './reducers/authReducer';
import {initialState as fetchReducer} from './reducers/fetchReducer';
import {initialState as forumReducer} from './reducers/forumReducer';
import {initialState as leaderBoardReducer } from './reducers/leaderBoardReducer';
import {initialState as profileReducer} from './reducers/profileReducer';
import {RouterState} from "connected-react-router";


export const getInitialState = (pathname: string = '/'): any => {
  return {
    authReducer,
    fetchReducer,
    leaderBoardReducer,
    profileReducer,
    forumReducer,
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP',
    } as RouterState,
  };
};
