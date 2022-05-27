import { TSignUpData, TDataSignInOAuth } from 'modules/api/authAPI';
import {
  ELoginActions,
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

export const registrationYaOAuthAC = (
): IRegisterYaOAuthAction => {
  return { type: ELoginActions.REGISTER_YA_OAUTH };
};

export const loginYaOAuthAC = ( dataSignIn: TDataSignInOAuth,
  ): ILoginYaOAuthAction => {
  return { type: ELoginActions.LOGIN_YA_OAUTH, payload: dataSignIn };
};

export const setErrorAC = (error: Error | null): ISetErrorAction => {
  return { type: ELoginActions.SET_ERROR, payload: error };
};
