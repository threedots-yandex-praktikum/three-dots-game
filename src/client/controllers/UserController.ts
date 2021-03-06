import { AuthAPI, TSignInData, TSignUpData, TDataSignInYa } from 'client/modules/api/authAPI';
import { HTTP_REQUEST_STATUS } from 'client/modules/api/httpTransport/constants';
import {
  loginAC,
  logoutAC,
  registrationAC,
  setErrorAC,
  loginYaOAuthAC,
  registrationYaOAuthAC,
} from 'client/store/reducers/authReducer/authActionCreators';
import _identity from 'lodash/identity';
import { NOTIFICATION_LEVEL, sendNotification } from '../modules/notification';
import { isServer, store } from 'client/store/store';

const { dispatch } = store;
export type TUserControllerClassError = {
  reason: string;
  response: unknown;
  status: HTTP_REQUEST_STATUS;
};

export class UserControllerClass {
  public static setError(error: TUserControllerClassError | null) {
    if (error === null) {
      return null;
    }

    return error;
  }

  public async getUserData() {
    try {
      await AuthAPI.getUserData();

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async logOut(cb: () => void) {
    try {
      dispatch(logoutAC(cb));

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async signUp(formData: TSignUpData, cb: () => void) {
    try {
      dispatch(registrationAC(formData, cb));

      UserControllerClass.setError(null);
    } catch (error) {
      return Promise.reject();
    }
  }

  public async signUpYaOAuth() {
    try {
      dispatch(registrationYaOAuthAC());

      UserControllerClass.setError(null);

    } catch (error) {
      return Promise.reject();
    }
  }

  public async signInYaOAuth(dataSignIn: TDataSignInYa) {
    try {
      dispatch(loginYaOAuthAC(dataSignIn));

      UserControllerClass.setError(null);

    } catch (error) {
      return Promise.reject();
    }
  }

  public async signIn(formData: TSignInData, cb: () => void) {
    try {
      await AuthAPI.signIn(formData);

      return this.fetchAndSetSignedUserData(cb);
    } catch (error) {
      if (
        (error as TUserControllerClassError).reason === 'User already in system'
      ) {
        await this.fetchAndSetSignedUserData(cb);
        return Promise.resolve();
      }
      setErrorAC(error as Error);
      sendNotification(
        (error as { errorText: string })?.errorText,
        NOTIFICATION_LEVEL.ERROR,
      );
      return Promise.reject(error);
    }
  }

  public async fetchAndSetSignedUserData(cb: () => void = _identity) {
    try {
      if (isServer) {
        cb();
      }
      dispatch(loginAC(cb));

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject(error);
    }
  }
}

export const UserController = new UserControllerClass();
