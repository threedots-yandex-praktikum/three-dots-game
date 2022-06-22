import { AUTH_API_ENDPOINTS, YANDEX_API_HOST } from './httpTransport/constants';
import { TUserModelResponse } from 'client/modules/api/profileAPI';
import axios from 'axios';

class AuthAPIServerClass {
  async getUserDataSSR(
    cookies: Record<string, string>,
  ): Promise<TUserModelResponse> {
    try {
      const cookie = Object.keys(cookies)
        .map((key) => `${key}=${cookies[key]}`)
        .join('; ');

      const response = await axios(
        YANDEX_API_HOST + '/' + AUTH_API_ENDPOINTS.USER_DATA,
        {
          headers: {
            cookie,
          },
        },
      );
      return response.data as TUserModelResponse;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}

export const AuthAPIServer = new AuthAPIServerClass();
