import { HTTPTransport } from "./httpTransport/httpTransport";
import {
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
    this.authHTTPTransportInstance = new HTTPTransport(YANDEX_API_HOST);
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

  async getThreeDotsLeaders() {
    console.log("getThreeDotsLeaders");
    const resultResponse = [];
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
    console.log(response, "response");
    // while ((response as unknown[]).length) {
    //   data.cursor += 10;

    //   resultResponse.push(response);
    // }
    resultResponse.push(response);

    return resultResponse;
  }
}

export const LeaderAPI = new LeaderBoardAPIClass();
