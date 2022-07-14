import { HTTPTransport } from './httpTransport/httpTransport';
import {
  AUTH_API_ENDPOINTS,
  DEFAULT_POST_REQUEST_HEADERS,
  YANDEX_API_HOST,
  YANDEX_CLOUD_HOST,
  YANDEX_OAUTH_HOST,
} from './httpTransport/constants';
import { TUserModelResponse } from 'client/modules/api/profileAPI';
import { getUrlOauth } from './oAuthConfig';
export type TSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name?: string;
  avatar?: string;
};

export type TSignInData = {
  login: string;
  password: string;
};

type TSignUpResponse = {
  id: number;
};

export type TDataSignInYa = {
  code: string;
  redirect_uri: string
};
class AuthAPIClass {
  authHTTPTransportInstance: HTTPTransport;
  oAuthHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.authHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);
    this.oAuthHTTPTransportInstance = new HTTPTransport(YANDEX_OAUTH_HOST);
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

  async getYaOAuthServiceId() {
    return await this.authHTTPTransportInstance.get(
      AUTH_API_ENDPOINTS.OAUTH_SERVICE_ID,
      {
        data: {
          redirect_uri: YANDEX_CLOUD_HOST,
        },
      },
    );
  }

  async redirectYaOAuth(serviceId: string) {
    const urlYa = getUrlOauth(serviceId);
    window.location.replace(urlYa);
  }

  async sendCodeAuthYa(data: TDataSignInYa) {
    return await this.authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.SIGN_IN_YA,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
  }

  async logOut() {
    return await this.authHTTPTransportInstance.post(
      AUTH_API_ENDPOINTS.LOG_OUT,
    );
  }

  async getUserData(): Promise<TUserModelResponse> {
    const response = await this.authHTTPTransportInstance.get(
      AUTH_API_ENDPOINTS.USER_DATA,
    );

    return response as TUserModelResponse;
  }
}

export const AuthAPI = new AuthAPIClass();
