import { TSignUpData, TDataSignInOAuth } from 'modules/api/authAPI';

export enum ELoginActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  SET_ERROR = 'SET_ERROR',
  REGISTER_YA_OAUTH = 'REGISTER_YA_OAUTH',
  LOGIN_YA_OAUTH = 'LOGIN_YA_OAUTH'
}
export type TAuthState = {
  error: null | Error;
};

export interface ILogoutAction {
  type: ELoginActions.LOGOUT;
  cb: () => void;
}
export interface ILogintAction {
  type: ELoginActions.LOGIN;
  cb: () => void;
}
export interface IRegisterAction {
  type: ELoginActions.REGISTER;
  payload: TSignUpData;
  cb: () => void;
}

export interface IRegisterYaOAuthAction {
  type: ELoginActions.REGISTER_YA_OAUTH;
}

export interface ILoginYaOAuthAction {
  type: ELoginActions.LOGIN_YA_OAUTH;
  payload: TDataSignInOAuth
}
export interface ISetErrorAction {
  type: ELoginActions.SET_ERROR;
  payload: null | Error;
}

export type TAuthAction =
  | ILogoutAction
  | ILogintAction
  | IRegisterAction
  | ISetErrorAction
  | IRegisterYaOAuthAction
  | ILoginYaOAuthAction;
