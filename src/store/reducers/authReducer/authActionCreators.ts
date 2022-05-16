import { TSignUpData } from 'modules/api/authAPI';
import {
  ELoginActions,
  ILogintAction,
  ILogoutAction,
  IRegisterAction,
  ISetErrorAction,
} from './types';

export const loginAC = (cb: () => void): ILogintAction => {
  return { type: ELoginActions.LOGIN, cb };
};

export const logoutAC = (cb: () => void): ILogoutAction => {
  return { type: ELoginActions.LOGOUT, cb };
};

export const registrationAC = (
  signUpData: TSignUpData,
  cb: () => void,
): IRegisterAction => {
  return { type: ELoginActions.REGISTER, payload: signUpData, cb };
};

export const setErrorAC = (error: Error | null): ISetErrorAction => {
  return { type: ELoginActions.SET_ERROR, payload: error };
};