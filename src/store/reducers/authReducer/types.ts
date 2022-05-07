import { TSignUpData } from "modules/api/authAPI";

export enum ELoginActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER = "SET_USER",
}
export type TAuthState = Omit<TSignUpData, "password">;

interface ISetUserAction {
  type: ELoginActions.SET_USER;
  payload: TAuthState;
}

interface ILogoutAction {
  type: ELoginActions.LOGOUT;
  payload: TAuthState;
}

export type TAuthAction = ISetUserAction | ILogoutAction;
