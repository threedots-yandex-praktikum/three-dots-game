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

  async getTheme(): Promise<userTheme> {
    const response = await this.userHTTPTransportInstance.get(THEME_ROUTE);
    console.log("getTheme ThemeAPI", response);

    return response as userTheme;
  }

  async changeTheme(theme: userTheme): Promise<userTheme> {
    console.log(theme, "changeTheme ThemeAPI");

    const response = await axios.put(BACKEND_PATH + USER_ROUTE + THEME_ROUTE, {
      theme,
    });

    return response.data as userTheme;
  }
}

export const ThemeAPI = new ThemeAPIClass();
