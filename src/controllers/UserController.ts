import { AuthAPI, TSignInData, TSignUpData } from "modules/api/authAPI";
import { HTTP_REQUEST_STATUS } from "modules/api/httpTransport/constants";
import {
  loginAC,
  logoutAC,
  registrationAC,
} from "../store/reducers/authReducer/authActionCreators";
import { store } from "../store/store";

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

  public async logOut() {
    try {
      dispatch(logoutAC());

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async signUp(formData: TSignUpData) {
    try {
      dispatch(registrationAC(formData));

      UserControllerClass.setError(null);
    } catch (error) {
      return Promise.reject();
    }
  }

  public async signIn(formData: TSignInData) {
    try {
      await AuthAPI.signIn(formData);

      return this.fetchAndSetSignedUserData();
    } catch (error) {
      if (
        (error as TUserControllerClassError).reason === "User already in system"
      ) {
        await this.fetchAndSetSignedUserData();
        return Promise.resolve();
      }

      return Promise.reject(error);
    }
  }

  public async fetchAndSetSignedUserData() {
    try {
      dispatch(loginAC());

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject(error);
    }
  }
}

export const UserController = new UserControllerClass();
