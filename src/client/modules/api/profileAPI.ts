import { HTTPTransport } from './httpTransport/httpTransport';
import {
  USER_API_ENDPOINTS,
  DEFAULT_POST_REQUEST_HEADERS,
  YANDEX_API_HOST,
} from './httpTransport/constants';

export type TChangeProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TUserModelResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  theme?: string;
};

class ProfileAPIClass {
  userHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.userHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);
  }

  async changeProfile(data: TChangeProfileData): Promise<TUserModelResponse> {
    const response = await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PROFILE,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
    return response as TUserModelResponse;
  }

  async changePassword(data: TChangePasswordData) {
    return await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_PASSWORD,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
  }

  async changeAvatar(data: FormData): Promise<TUserModelResponse> {
    const response = await this.userHTTPTransportInstance.put(
      USER_API_ENDPOINTS.CHANGE_AVATAR,
      {
        data,
        isFile: true,
      },
    );

    return response as TUserModelResponse;
  }

  async getUsersByLogin(login: string): Promise<TUserModelResponse[]> {
    const response = await this.userHTTPTransportInstance.post(
      USER_API_ENDPOINTS.SEARCH_USER,
      {
        data: { login },
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );

    return response as TUserModelResponse[];
  }

  async getUserById(userId: number): Promise<TUserModelResponse> {
    const response = await this.userHTTPTransportInstance.get(
      [USER_API_ENDPOINTS.GET_USER_BY_ID, userId].join('/'),
    );

    return response as TUserModelResponse;
  }
}

export const ProfileAPI = new ProfileAPIClass();
