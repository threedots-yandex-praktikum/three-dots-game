import { HTTPTransport } from "./httpTransport/httpTransport";
import {
  LEADER_BOARD_API_ENDPOINTS,
  DEFAULT_POST_REQUEST_HEADERS,
  YANDEX_API_HOST,
  TEAM_NAME,
} from "./httpTransport/constants";

//LB-LeaderBoard
export type TAddToLBData = {
  score: number;
  userName: string;
  id: number;
};

export type TGet3DotsLBData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

class LeaderBoardAPIClass {
  authHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.authHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);
  }

  async addUser(palayerData: TAddToLBData) {
    const data = {
      data: { ...palayerData },
      ratingFieldName: "score",
      teamName: TEAM_NAME,
    };
    return await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.ADD_USER,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      }
    );
  }

  async getThreeDotsLeaders() {
    const data: TGet3DotsLBData = {
      cursor: 0,
      limit: 20,
      ratingFieldName: "score",
    };
    const response = await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.GET_THEE_DOTS_LEADERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      }
    );
    return response;
  }
}

export const LeaderAPI = new LeaderBoardAPIClass();
