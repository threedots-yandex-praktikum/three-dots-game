import { TSignUpData } from "modules/api/authAPI";

export enum ELoginActions {
  LOGIN = "LOGIN",
  LOGIN_ON_SERVER = "LOGIN_ON_SERVER",

  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  SET_ERROR = "SET_ERROR",
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
export interface ISetErrorAction {
  type: ELoginActions.SET_ERROR;
  payload: null | Error;
}
export interface ILoginOnServerAction {
  type: ELoginActions.LOGIN_ON_SERVER;
  payload: {
    cookie: string;
    cb: () => void;
  };
}

export type TAuthAction =
  | ILogoutAction
  | ILogintAction
  | IRegisterAction
  | ISetErrorAction
  | ILoginOnServerAction;
