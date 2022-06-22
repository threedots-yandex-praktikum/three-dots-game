import { HTTPTransport } from './httpTransport/httpTransport';
import {
  DEFAULT_POST_REQUEST_HEADERS,
  LOCAL_API_HOST,
} from './httpTransport/constants';
import { TCurrentTopic, TNewTopicData, TSendData, TTopic } from 'client/store/reducers/forumReducer/types';
import _groupBy from 'lodash/groupBy';


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

    const {
      topic,
      comments,
    } = response.data;

    const topicData = {
      title: topic.name,
      isDisabled: topic.status === 1,
      userOwenerId: topic.userId,
    };

    if(response.data.length === 0) {
      return {
        ...topicData,
        messages: [],
      };
    }

    /*
  * TODO необходимо на основе этой структуры оформить массив комметов и по нему пробегаться, вместо comments
  *  также необходимо проверить, что последовательность комментариев сохранена, т.е. они по дате должны нормально распологаться
  *  друг за другом
  * */
    const commentsGroupedByParent = _groupBy(
      comments,
      ({ parentId }) => parentId,
    );

    const transformSingleCommentData = item => {
      const {
        id: messageId,
        message: text,
        createdAt: time,
        user: {
          name: userName,
        },
        reactions,
        commentReactions,
        parentId,
      } = item;

      return {
        messageId,
        userName,
        time,
        text,
        reactions,
        commentReactions,
        parentId,
      };
    };

    const getRepliesDataFromCommentsGroupedByParent = data => {
      const transformedSingleCommentData = transformSingleCommentData(data);

      if(!commentsGroupedByParent[data.id]) {
        return {
          ...transformedSingleCommentData,
          replies: [],
        };
      }

      return {
        ...transformedSingleCommentData,
        replies: commentsGroupedByParent[data.id]
          .map(getRepliesDataFromCommentsGroupedByParent),
      };
    };

    const responseData = {
      ...topicData,
      messages: commentsGroupedByParent['null']
        .map(data => getRepliesDataFromCommentsGroupedByParent(data)),
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

        if(comments.length === 0) {
          return {
            topicId: id,
            title: name,
            date: null,
            lastMessage: null,
          };
        }

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
            date: createdAt,
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
          message: data.message,
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

  async createComment(data: TSendData) {
    const response: any = await this.forumHTTPTransportInstance.post(
      FORUM_API_ENDPOINTS.COMMENTS,
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        data,
      },
    );

    return response.data;
  }

  async editComment(data: TSendData, commentToEditId: number) {
    const response: any = await this.forumHTTPTransportInstance.put(
      [FORUM_API_ENDPOINTS.COMMENTS, commentToEditId].join('/'),
      {
        headers: DEFAULT_POST_REQUEST_HEADERS,
        data,
      },
    );

    return response.data;
  }

  async deleteComment(id: number) {
    const response: any = await this.forumHTTPTransportInstance.delete(
      [FORUM_API_ENDPOINTS.COMMENTS, id].join('/'),
    );

    return response;
  }
}

export const ForumAPI = new ForumAPIClass();
