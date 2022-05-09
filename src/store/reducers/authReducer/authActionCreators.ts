import { TSignUpData } from 'modules/api/authAPI';
import {
  ELoginActions,
  ILogintAction,
  ILogoutAction,
  IRegisterAction,
  ISetErrorAction,
} from './types';

export const loginAC = (): ILogintAction => {
  return { type: ELoginActions.LOGIN };
};

export const logoutAC = (): ILogoutAction => {
  return { type: ELoginActions.LOGOUT };
};

export const registrationAC = (signUpData: TSignUpData): IRegisterAction => {
  return { type: ELoginActions.REGISTER, payload: signUpData };
};

export const setErrorAC = (error: Error | null): ISetErrorAction => {
  return { type: ELoginActions.SET_ERROR, payload: error };
};
