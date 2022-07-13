export const YANDEX_PRAKTIKUM_TECH_HOST = 'ya-praktikum.tech';

export const YANDEX_API_HOST = `https://${YANDEX_PRAKTIKUM_TECH_HOST}/api/v2`;
export const RESOURCES_URL = [YANDEX_API_HOST, 'resources'].join('/');
export const YANDEX_OAUTH_HOST = 'https://oauth.yandex.ru';
export const GEOAPIFY_HOST = 'https://api.geoapify.com';
export const GEOAPIFY_URL = `https://${GEOAPIFY_HOST}/v1/ipinfo?apiKey=0016d9a8eeab4591849154961e4e7fd3`;
export const YANDEX_CLOUD_HOST = `https://three-dots-13.${YANDEX_PRAKTIKUM_TECH_HOST}`;
export const LOCAL_API_HOST = [YANDEX_CLOUD_HOST, 'api'].join('/');
export const GITHUB_REPO_URL = 'https://github.com/threedots-yandex-praktikum/three-dots-game';

export const GOOGLE_APIS_FONTS_HOST = 'https://fonts.googleapis.com';
export const GSTATIC_FONTS_HOST = 'https://fonts.gstatic.com';

export const TEAM_NAME = 'three-dots';
export const RATING_FIELD_NAME = 'score';

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
