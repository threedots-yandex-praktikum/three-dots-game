export type TForumState = {
  topics: null | TTopic[];
  currentTopic: null | TCurrentTopic;
};

export type TTopic = {
  topicId: number;
  title: string;
  date: number;
  lastMessage: TLastMessage | null;
};

export type TLastMessage = {
  userName: string;
  message: string;
};

export type TCurrentTopic = {
  title: string;
  messages: TMessage[];
  isDisabled: boolean;
  userOwenerId: number;
};

export type TMessage = {
  messageId: number;
  avatarLink: null | string;
  userName: string;
  time: number;
  text: string;
  country?: string;
  town?: string;
};

export type TSendData = {
  userId: number;
  topicId: number;
  message: string;
  parentId?: string | null,
  commentId?: string | null,
  country?: string;
  town?: string;
};

export type TNewTopicData = {
  userId: number;
  title: string;
  message: string;
};

export enum EForumActions {
  SET_TOPICS = 'SET_TOPICS',
  GET_TOPICS = 'GET_TOPICS',
  SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC',
  GET_CURRENT_TOPIC = 'GET_CURRENT_TOPIC',
  CREATE_NEW_TOPIC = 'CREATE_NEW_TOPIC',
  CLOSE_CURRENT_TOPIC = 'CLOSE_CURRENT_TOPIC',
  SEND_MESSAGE = 'SEND_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  SEND_REACTION = 'SEND_REACTION',
}
interface IGetTopicsAction {
  type: EForumActions.GET_TOPICS;
}
interface ISetTopicsAction {
  type: EForumActions.SET_TOPICS;
  payload: TTopic[];
}
export interface IGetCurrentTopicAction {
  type: EForumActions.GET_CURRENT_TOPIC;
  payload: number;
}
interface ISetCurrentTopicAction {
  type: EForumActions.SET_CURRENT_TOPIC;
  payload: TCurrentTopic;
}
export interface ICreateNewTopicAction {
  type: EForumActions.CREATE_NEW_TOPIC;
  payload: TNewTopicData;
}
interface ICloseTopicAction {
  type: EForumActions.CLOSE_CURRENT_TOPIC;
  payload: number;
}
interface ISendMessageAction {
  type: EForumActions.SEND_MESSAGE;
  payload: TSendData;
}
interface IDeleteMessageAction {
  type: EForumActions.DELETE_MESSAGE;
  payload: {
    topicId: number,
    commentId: number,
  };
}

interface ISendReactionAction {
  type: EForumActions.SEND_REACTION;
  payload: {
    topicId: number,
    commentId: number,
    reactionCode: string,
  };
}

export type TForumAction =
  | ISetTopicsAction
  | IGetTopicsAction
  | IGetCurrentTopicAction
  | ISetCurrentTopicAction
  | ICreateNewTopicAction
  | ICloseTopicAction
  | ISendMessageAction
  | IDeleteMessageAction
  | ISendReactionAction;
