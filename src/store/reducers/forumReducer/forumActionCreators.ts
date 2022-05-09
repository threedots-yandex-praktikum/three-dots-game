import { TCurrentTopic, TNewTopicData, TSendData, TTopic } from "./types";
import { EForumActions } from "./types";

export const getTopicsAC = () => {
  return { type: EForumActions.GET_TOPICS };
};

export const setTopicsAC = (topics: TTopic[]) => {
  return { type: EForumActions.SET_TOPICS, payload: topics };
};

export const getCurrentTopicAC = (topicId: number) => {
  return { type: EForumActions.GET_CURRENT_TOPIC, payload: topicId };
};

export const setCurrentTopicAC = (currentTopicData: TCurrentTopic) => {
  return { type: EForumActions.SET_CURRENT_TOPIC, payload: currentTopicData };
};

export const createNewTopicAC = (data: TNewTopicData) => {
  return { type: EForumActions.CREATE_NEW_TOPIC, payload: data };
};

export const closeTopicAC = (topicId: number) => {
  return { type: EForumActions.CLOSE_CURRENT_TOPIC, payload: topicId };
};

export const sendMessageeAC = (messageData: TSendData) => {
  return { type: EForumActions.SEND_MESSAGE, payload: messageData };
};
