import { HTTPTransport } from "./httpTransport/httpTransport";
import {
  PREFIX_GAME_API,
  LEADER_BOARD_API_ENDPOINTS,
  DEFAULT_POST_REQUEST_HEADERS,
  YANDEX_API_HOST,
} from "./httpTransport/constants";

//LB-LeaderBoard
export type TAddToLBData = {
  data: Record<string, any>;
  ratingFieldName: string;
  teamName: "three-dots";
};

export type TGet3DotsLBData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

class LeaderBoardAPIClass {
  authHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.authHTTPTransportInstance = new HTTPTransport(
      YANDEX_API_HOST + PREFIX_GAME_API
    );
  }

  async addUser(data: TAddToLBData) {
    console.log("addUser");

    return await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.ADD_USER,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      }
    );
  }

  async getThreeDotsLeaders(data: TGet3DotsLBData) {
    console.log("getThreeDotsLeaders");

    return await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.GET_THEE_DOTS_LEADERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      }
    );
  }
}

export const LeaderAPI = new LeaderBoardAPIClass();
