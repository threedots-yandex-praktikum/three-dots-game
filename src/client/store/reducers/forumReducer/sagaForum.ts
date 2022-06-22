import { TakeableChannel } from 'redux-saga';
import { actionChannel, call, put, takeEvery } from 'redux-saga/effects';
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from 'client/modules/notification';
import { setErrorAC } from '../authReducer/authActionCreators';
import {
  setFetchOffAC,
  setFetchOnAC,
} from 'client/store/reducers/fetchReducer/fetchActionCreators';
import {
  closeTopicAC,
  createNewTopicAC,
  getCurrentTopicAC,
  getTopicsAC,
  sendMessageAC,
  setCurrentTopicAC,
  setTopicsAC,
} from './forumActionCreators';
import { EForumActions, TCurrentTopic, TTopic } from './types';
import { ForumAPI } from 'client/modules/api/forumAPI';
import _omit from 'lodash/omit';


function* fetchGetTopics() {
  try {
    yield put(setFetchOnAC());


    const response: TTopic[] = yield call(
      ForumAPI.getTopics.bind(ForumAPI),
    );

    yield put(setTopicsAC(response));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchGetTopics() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    EForumActions.GET_TOPICS,
  );
  yield takeEvery(channel, fetchGetTopics);
}

function* fetchGetCurrentTopic(args) {
  try {
    yield put(setFetchOnAC());
    const response: TCurrentTopic = yield call(
      ForumAPI.getCurrentTopic.bind(ForumAPI, args.payload),
    );

    yield put(setCurrentTopicAC(response));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchGetCurrentTopic() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    EForumActions.GET_CURRENT_TOPIC,
  );
  yield takeEvery(channel, fetchGetCurrentTopic);
}

function* fetchCloseTopic({ payload }: ReturnType<typeof closeTopicAC>) {
  try {
    yield put(setFetchOnAC());
    yield call(
      ForumAPI.closeTopic.bind(ForumAPI),
      payload,
    );

    yield put(getTopicsAC());

    yield put(getCurrentTopicAC(payload));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchCloseTopic() {
  const channel: TakeableChannel<ReturnType<typeof closeTopicAC>> =
    yield actionChannel(EForumActions.CLOSE_CURRENT_TOPIC);
  while (true) {
    yield takeEvery(channel, fetchCloseTopic);
  }
}

function* fetchCreateTopic({ payload }: ReturnType<typeof createNewTopicAC>) {
  try {
    yield put(setFetchOnAC());
    const newTopic: TTopic = yield call(
      ForumAPI.createTopic.bind(ForumAPI, payload),
    );

    yield put(getTopicsAC());

    yield put(getCurrentTopicAC(newTopic.topicId));

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchCreateTopic() {
  const channel: TakeableChannel<ReturnType<typeof createNewTopicAC>> =
    yield actionChannel(EForumActions.CREATE_NEW_TOPIC);
  while (true) {
    yield takeEvery(channel, fetchCreateTopic);
  }
}

function* fetchSendMessage({ payload }: ReturnType<typeof sendMessageAC>) {
  try {
    yield put(setFetchOnAC());

    const commentData = _omit(payload, 'commentId');

    yield call(
      payload.commentId ?
        ForumAPI.editComment.bind(ForumAPI, commentData, payload.commentId) :
        ForumAPI.createComment.bind(ForumAPI, commentData),
    );

    yield put(getCurrentTopicAC(commentData.topicId));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchSendMessage() {
  const channel: TakeableChannel<ReturnType<typeof sendMessageAC>> =
    yield actionChannel(EForumActions.SEND_MESSAGE);
  while (true) {
    yield takeEvery(channel, fetchSendMessage);
  }
}
