import { TSignUpData } from "modules/api/authAPI";
import { ELoginActions, TAuthAction } from "./types";

export const loginAC = (): TAuthAction => {
  return { type: ELoginActions.LOGIN };
};

export const logoutAC = (): TAuthAction => {
  return { type: ELoginActions.LOGOUT };
};

export const registrationAC = (signUpData: TSignUpData) => {
  return { type: ELoginActions.REGISTER, payload: signUpData };
};

export const setErrorAC = (error: Error | null): TAuthAction => {
  return { type: ELoginActions.SET_ERROR, payload: error };
};
