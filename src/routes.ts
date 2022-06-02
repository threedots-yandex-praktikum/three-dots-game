import loadable from '@loadable/component';
import {
  FORUM_ROUTE,
  GAME_OVER_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_START_ROUTE,
  HOME_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  EDIT_PASSWORD_ROUTE,
  ROOT_ROUTE,
} from 'constants/routes';
//import Home from 'pages/Home';
// import Login from 'pages/Login';
// import Register from 'pages/Register';
// import Profile from 'pages/Profile';
// import LeaderBoard from 'pages/LeaderBoard';
// import Forum from 'pages/Forum';
// import GameStart from 'pages/GameStart';
// import GamePlay from 'pages/GamePlay';
// import GameOver from 'pages/GameOver';
// import EditPassword from 'pages/EditPassword';
const Home = loadable(() => import('pages/Home'));
const Login = loadable(() => import('pages/Login'));
const Register = loadable(() => import('pages/Register'));
const Profile = loadable(() => import('pages/Profile'));
const LeaderBoard = loadable(() => import('pages/LeaderBoard'));
const Forum = loadable(() => import('pages/Forum'));
const GameStart = loadable(() => import('pages/GameStart'));
const GamePlay = loadable(() => import('pages/GamePlay'));
const GameOver = loadable(() => import('pages/GameOver'));
const EditPassword = loadable(() => import('pages/EditPassword'));
import { Action } from 'redux';
import _identity from 'lodash/identity';

export interface ReduxAction<T = any, P = any> extends Action {
  type: T;
  payload?: P;
}

export default [
  {
    path: HOME_ROUTE,
    component: Home,
    needAuth: false,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: LOGIN_ROUTE,
    component: Login,
    needAuth: false,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: REGISTER_ROUTE,
    component: Register,
    needAuth: false,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: PROFILE_ROUTE,
    component: Profile,
    needAuth: true,
    exact: true,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: LEADERBOARD_ROUTE,
    component: LeaderBoard,
    needAuth: true,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: FORUM_ROUTE,
    component: Forum,
    needAuth: true,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: GAME_START_ROUTE,
    component: GameStart,
    needAuth: false,
    exact: true,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: GAME_PLAY_ROUTE,
    component: GamePlay,
    needAuth: false,
    exact: true,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: GAME_OVER_ROUTE,
    component: GameOver,
    needAuth: false,
    exact: true,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: EDIT_PASSWORD_ROUTE,
    component: EditPassword,
    needAuth: true,
    exact: true,
    fetchData: _identity(Promise.resolve()),
  },
  {
    path: ROOT_ROUTE,
    component: Home,
    needAuth: false,
    exact: false,
    fetchData: _identity(Promise.resolve()),
  },
];
