import { AUTH_API_ENDPOINTS, YANDEX_API_HOST } from "./httpTransport/constants";
import { TUserModelResponse } from "modules/api/profileAPI";
import axios from "axios";

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

class AuthAPIServerClass {
  async getUserDataSSR(cookie: string): Promise<TUserModelResponse> {
    try {
      const response = await axios(
        YANDEX_API_HOST + "/" + AUTH_API_ENDPOINTS.USER_DATA,
        {
          headers: {
            cookie,
          },
        }
      );
      return response.data as unknown as TUserModelResponse;
    } catch (error) {
      console.error(error);

      return error as unknown as TUserModelResponse;
    }
  }
}

export const AuthAPIServer = new AuthAPIServerClass();
