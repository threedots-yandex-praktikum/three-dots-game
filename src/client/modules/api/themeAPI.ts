import { HTTPTransport } from "./httpTransport/httpTransport";
import { userTheme } from "../../../server/models/user";
import { THEME_ROUTE, USER_ROUTE } from "../../../server/router/constants";
import axios from "axios";

const BACKEND_PATH = "https://local.ya-praktikum.tech:5000";

class ThemeAPIClass {
  userHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.userHTTPTransportInstance = new HTTPTransport(
      BACKEND_PATH + USER_ROUTE
    );
  }

  async getTheme(id: number, first_name: string): Promise<userTheme> {
    const response = await axios.get(BACKEND_PATH + USER_ROUTE + THEME_ROUTE, {
      params: {
        id,
        first_name,
      },
    });
    return response.data.data as userTheme;
  }

  async changeTheme(theme: userTheme): Promise<userTheme> {
    const response = await axios.put(BACKEND_PATH + USER_ROUTE + THEME_ROUTE, {
      theme,
    });

    return response.data.data as userTheme;
  }
}

export const ThemeAPI = new ThemeAPIClass();
