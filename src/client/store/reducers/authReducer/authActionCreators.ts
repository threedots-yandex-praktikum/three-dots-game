import { TSignUpData, TDataSignInYa } from 'client/modules/api/authAPI';
import {
  ELoginActions,
  ILoginOnServerAction,
  ILogintAction,
  ILogoutAction,
  IRegisterAction,
  ISetErrorAction,
  IRegisterYaOAuthAction,
  ILoginYaOAuthAction,
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

export const loginOnServerAC = (
  cookie: string,
  cb: () => void,
): ILoginOnServerAction => {
  return { type: ELoginActions.LOGIN_ON_SERVER, payload: { cb, cookie } };
};
export const registrationYaOAuthAC = (
): IRegisterYaOAuthAction => {
  return { type: ELoginActions.REGISTER_YA_OAUTH };
};

export const loginYaOAuthAC = ( dataSignIn: TDataSignInYa,
  ): ILoginYaOAuthAction => {
  return { type: ELoginActions.LOGIN_YA_OAUTH, payload: dataSignIn };
};

export const setErrorAC = (error: Error | null): ISetErrorAction => {
  return { type: ELoginActions.SET_ERROR, payload: error };
};
