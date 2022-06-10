import { HTTPTransport } from './httpTransport/httpTransport';
import {
  LEADER_BOARD_API_ENDPOINTS,
  DEFAULT_POST_REQUEST_HEADERS,
  YANDEX_API_HOST,
  TEAM_NAME,
  RATING_FIELD_NAME,
} from './httpTransport/constants';

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

  async addUser(playerData: TAddToLBData) {
    const data = {
      data: { ...playerData },
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    };
    return await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.ADD_USER,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
  }

  async getThreeDotsLeaders() {
    const data: TGet3DotsLBData = {
      cursor: 0,
      limit: 20,
      ratingFieldName: RATING_FIELD_NAME,
    };
    const response = await this.authHTTPTransportInstance.post(
      LEADER_BOARD_API_ENDPOINTS.GET_THEE_DOTS_LEADERS,
      {
        data,
        headers: DEFAULT_POST_REQUEST_HEADERS,
      },
    );
    return response;
  }
}

export const LeaderAPI = new LeaderBoardAPIClass();
