import loadable from "@loadable/component";
import _constant from 'lodash/constant';
import _identity from "lodash/identity";

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
} from 'client/constants/routes';


const defaultIsVisible = _constant(true);
const isVisibleForAuthenticatedUser = (isUserAuthenticated: boolean) => isUserAuthenticated;
const isVisibleForNotAuthenticatedUser = (isUserAuthenticated: boolean) => !isUserAuthenticated;

export const NAVIGATION_SCHEMA = [
  {
    title: 'Лендинг',
    route: HOME_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: 'Вход',
    route: LOGIN_ROUTE,
    isVisible: isVisibleForNotAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Регистрация',
    route: REGISTER_ROUTE,
    isVisible: isVisibleForNotAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Профиль',
    route: PROFILE_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Форум',
    route: FORUM_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Таблица рекордов',
    route: LEADERBOARD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Запуск игры',
    route: GAME_START_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: 'Игра',
    route: GAME_PLAY_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: 'Конец игры',
    route: GAME_OVER_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: 'Смена пароля',
    route: EDIT_PASSWORD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
];


const Home = loadable(() => import('../../pages/Home'));
const Login = loadable(() => import('../../pages/Login'));
const Register = loadable(() => import('../../pages/Register'));
const Profile = loadable(() => import('../../pages/Profile'));
const LeaderBoard = loadable(() => import('../../pages/LeaderBoard'));
const Forum = loadable(() => import('../../pages/Forum'));
const GameStart = loadable(() => import('../../pages/GameStart'));
const GamePlay = loadable(() => import('../../pages/GamePlay'));
const GameOver = loadable(() => import('../../pages/GameOver'));
const EditPassword = loadable(() => import('../../pages/EditPassword'));


export const APP_ROUTES_SCHEMA = [
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
