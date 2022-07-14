import { HTTPTransport } from './httpTransport/httpTransport';
import { userTheme } from 'server/models/user';
import axios from 'axios';
import {LOCAL_API_HOST} from "client/modules/api/httpTransport/constants";


const USER_ROUTE = [LOCAL_API_HOST, 'user'].join('/');
const THEME_ROUTE = [USER_ROUTE, 'theme'].join('/');

class ThemeAPIClass {
  userHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.userHTTPTransportInstance = new HTTPTransport(USER_ROUTE);
  }

  async getTheme(id: number, first_name: string): Promise<userTheme> {
    const response = await axios.get(THEME_ROUTE, {
      params: {
        id,
        first_name,
      },
    });
    return response.data.data as userTheme;
  }

  async changeTheme(theme: userTheme): Promise<userTheme> {
    const response = await axios.put(THEME_ROUTE, {
      theme,
    });

    return response.data.data as userTheme;
  }
}

export const ThemeAPI = new ThemeAPIClass();
