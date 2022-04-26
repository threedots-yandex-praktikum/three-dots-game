import { HTTPTransport } from './httpTransport/httpTransport';
import { AUTH_API_ENDPOINTS, DEFAULT_POST_REQUEST_HEADERS, YANDEX_API_HOST } from './httpTransport/constants';
import {TUserModelResponse} from "modules/api/profileAPI";


export type TSignUpData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

export type TSignInData = {
  login: string,
  password: string,
}

type TSignUpResponse = {
  id: number,
}

class AuthAPIClass {
  authHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.authHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);
  }

  async signUp(data: TSignUpData): Promise<TSignUpResponse> {
    const response = await this.authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_UP,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );

    return response as TSignUpResponse;
  }

  async signIn(data: TSignInData) {
    return await this.authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_IN,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
  }

  async logOut() {
    return await this.authHTTPTransportInstance.post(AUTH_API_ENDPOINTS.LOG_OUT);
  }

  async getUserData(): Promise<TUserModelResponse> {
    const response = await this.authHTTPTransportInstance.get(AUTH_API_ENDPOINTS.USER_DATA);

    return response as TUserModelResponse;
  }
}

export const AuthAPI = new AuthAPIClass();
