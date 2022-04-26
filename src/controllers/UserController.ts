import { AuthAPI, TSignInData, TSignUpData } from '../modules/api/authAPI';
import {HTTP_REQUEST_STATUS} from "modules/api/httpTransport/constants";


type TUserControllerClassError = { reason: string, response: unknown, status: HTTP_REQUEST_STATUS };

export const LOCALSTORAGE_USER_KEY = 'isUserAuthenticated';

export class UserControllerClass {
  public static setError(error: TUserControllerClassError | null) {
    if(error === null) {
      return console.log('drop error')
    }

    console.log('set error', error)
  }

  public async getUserData() {
    try {
      const userData = await AuthAPI.getUserData();

      console.log('userData: ', userData);
      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async logOut() {
    try {
      await AuthAPI.logOut();

      console.log('user logged out')
      UserControllerClass.setError(null);
      localStorage.setItem(LOCALSTORAGE_USER_KEY, 'false');
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async signUp(formData: TSignUpData) {
    try {
      const response = await AuthAPI.signUp(formData);
      const {
        id,
      } = response;

      console.log(
        'signed user data: ',
        {
          ...formData,
          id,
          firstName: formData.first_name,
          secondName: formData.second_name,
        },
        );
      UserControllerClass.setError(null);
    } catch (error) {
      console.log('registerError', error);
      return Promise.reject();
    }
  }

  public async signIn(formData: TSignInData) {
    try {
      await AuthAPI.signIn(formData);

      await this.fetchAndSetSignedUserData();
    } catch(error) {
      if((error as TUserControllerClassError).reason === 'User already in system') {
        await this.fetchAndSetSignedUserData();
        return Promise.resolve();
      }

      console.log('loginError', error);
      return Promise.reject();
    }
  }

  public async fetchAndSetSignedUserData() {
    try {
      const signedUserResponse = await AuthAPI.getUserData();

      const {
        id,
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      } = signedUserResponse;

      console.log(
        'user.data',
        {
          id,
          firstName: first_name,
          secondName: second_name,
          displayName: display_name,
          login,
          email,
          phone,
          avatar,
        },
      );
      localStorage.setItem(LOCALSTORAGE_USER_KEY, 'true');
      UserControllerClass.setError(null);

    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }
}


export const UserController = new UserControllerClass();