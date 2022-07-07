export const YANDEX_API_HOST = 'https://ya-praktikum.tech/api/v2';
export const YANDEX_OAUTH_HOST = 'https://oauth.yandex.ru';
export const LOCAL_API_HOST = `https://${process.env.HOST}/api`;

export const TEAM_NAME = 'three-dots';

export const RATING_FIELD_NAME = 'score';

export const BACKEND_PATH = process.env.HOST;

export const AUTH_API_ENDPOINTS = {
  SIGN_UP: 'auth/signup',
  SIGN_IN: 'auth/signin',
  USER_DATA: 'auth/user',
  LOG_OUT: 'auth/logout',
  OAUTH_SERVICE_ID: 'oauth/yandex/service-id',
  SIGN_IN_YA: 'oauth/yandex',
};

export const USER_API_ENDPOINTS = {
  CHANGE_PROFILE: 'user/profile',
  CHANGE_AVATAR: 'user/profile/avatar',
  CHANGE_PASSWORD: 'user/password',
  SEARCH_USER: 'user/search',
  GET_USER_BY_ID: 'user',
};

export const LEADER_BOARD_API_ENDPOINTS = {
  ADD_USER: 'leaderboard',
  GET_ALL_LEADER_BOARDS: 'leaderboard/all',
  GET_THEE_DOTS_LEADERS: `leaderboard/${TEAM_NAME}`,
};
export const DEFAULT_POST_REQUEST_HEADERS = {
  'content-type': 'application/json',
};

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HTTP_REQUEST_STATUS {
  SUCCESS = 'SUCCESS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  FAILED = 'FAILED',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
}
