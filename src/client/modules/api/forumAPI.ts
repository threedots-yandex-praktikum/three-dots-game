import { HTTPTransport } from "./httpTransport/httpTransport";
import { DEFAULT_POST_REQUEST_HEADERS } from "./httpTransport/constants";
import { FORUM_ROUTE } from "../../../server/router/constants";
import { Topic } from "../../../server/models";

export type TCreateTopic = {
  name: string;
  userId: number;
  coment: string;
};
class ForumAPIClass {
  userHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.userHTTPTransportInstance = new HTTPTransport(FORUM_ROUTE);
  }

  async getGetTopics(): Promise<Topic[]> {
    const response = await this.userHTTPTransportInstance.get("topic", {
      headers: DEFAULT_POST_REQUEST_HEADERS,
    });
    console.log(response);

    return response as Topic[];
  }
  async createTopic({ name, userId, coment }: TCreateTopic): Promise<Topic> {
    const response = await this.userHTTPTransportInstance.post("topic", {
      headers: DEFAULT_POST_REQUEST_HEADERS,
      data: {
        name,
        userId,
        coment,
      },
    });
    console.log(response);

    return response as Topic;
  }
}

export const ForumAPI = new ForumAPIClass();
