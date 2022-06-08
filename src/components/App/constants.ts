import _constant from 'lodash/constant';
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
} from 'constants/routes';

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
