import { HTTPTransport } from './httpTransport/httpTransport';
import {
  DEFAULT_POST_REQUEST_HEADERS,
  LOCAL_API_HOST,
} from './httpTransport/constants';
import {TCurrentTopic, TNewTopicData, TTopic} from 'client/store/reducers/forumReducer/types';


export const FORUM_API_ENDPOINTS = {
  TOPICS: 'forum/topic',
  COMMENTS: 'forum/comment',
};

class ForumAPIClass {
  forumHTTPTransportInstance: HTTPTransport;

  constructor() {
    this.forumHTTPTransportInstance = new HTTPTransport(LOCAL_API_HOST);
  }

  async getCurrentTopic(topicId: number): Promise<TCurrentTopic> {
    const response: any = await this.forumHTTPTransportInstance.get(
      FORUM_API_ENDPOINTS.COMMENTS,
      {
        data: {
          topicId,
        },
      },
    );

    const topic = response.data[0].topic;

    const responseData = {
      title: topic.name,
      isDisabled: topic.status === 0,
      userOwenerId: topic.userId,
      messages: response.data
        .map(item => {
          const {
            id: messageId,
            message: text,
            createdAt: time,
            user: {
              name: userName,
            },
          } = item;

          return {
            messageId,
            userName,
            time,
            text,
          };
        }),
    };

    return responseData as TCurrentTopic;
  }

  async getTopics(): Promise<TTopic[]> {
    const response = await this.forumHTTPTransportInstance.get(
      FORUM_API_ENDPOINTS.TOPICS,
    );

    const responseData = response.data
      .map(item => {
        const {
          id,
          name,
          comments,
        } = item;

        const {
          message,
          createdAt,
          user,
        } = comments[0];

        const { name: userName } = user;

        return {
          topicId: id,
          title: name,
          date: createdAt,
          lastMessage: {
            userName,
            message,
          },
        };
      });

    return responseData as TTopic[];
  }


  async createTopic(data: TNewTopicData) {
    const response: any = await this.forumHTTPTransportInstance.post(
      FORUM_API_ENDPOINTS.TOPICS,
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        data: {
          userId: data.userId,
          name: data.title,
        },
      },
    );

    const {
      id,
      name,
      createdAt,
    } = response.data;

    return {
      topicId: id,
      name,
      date: createdAt,
      lastMessage: '',
    };
  }

  async closeTopic(topicId: number) {
    const response: any = await this.forumHTTPTransportInstance.put(
      FORUM_API_ENDPOINTS.TOPICS,
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        data: {
          topicId,
          status: 1,
        },
      },
    );

    return response.data;
  }
}

export const ForumAPI = new ForumAPIClass();
