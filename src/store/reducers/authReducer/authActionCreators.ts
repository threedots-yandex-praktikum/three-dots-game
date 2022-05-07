import { ELoginActions, TAuthState } from "./types";

export const setUserAC = (userData: TAuthState) => {
  return { type: ELoginActions.SET_USER, payload: userData };
};

export const logoutAC = () => {
  return { type: ELoginActions.LOGOUT };
};
