import { TakeableChannel } from 'redux-saga';
import { actionChannel, put, takeEvery } from 'redux-saga/effects';
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from '../../../modules/notification';
import { setErrorAC } from '../authReducer/authActionCreators';
import {
  setFetchOffAC,
  setFetchOnAC,
} from '../fetchReducer/fetchActionCreators';
import {
  closeTopicAC,
  createNewTopicAC,
  getCurrentTopicAC,
  sendMessageAC,
  setCurrentTopicAC,
  setTopicsAC,
} from './forumActionCreators';
import { EForumActions, TCurrentTopic, TTopic } from './types';

function* fetchGetTopics() {
  try {
    yield put(setFetchOnAC());
    //тут должен быть ForumAPI которого пока нет
    // const response: TTopic[] = yield call(
    //   ForumAPI.getGetTopics.bind(ForumAPI)
    // );
    const response: TTopic[] = [
      {
        topicId: 1,
        title: 'TITLE_1',
        date: new Date().getTime(),
        lastMessage: {
          userName: 'User1',
          message: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
        },
      },
      {
        topicId: 2,
        title: 'TITLE_2',
        date: new Date().getTime(),
        lastMessage: {
          userName: 'User2',
          message: '1',
        },
      },
      {
        topicId: 3,
        title:
          'TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3',
        date: new Date().getTime(),
        lastMessage: null,
      },
      {
        topicId: 4,
        title: 'TITLE_33',
        date: new Date().getTime(),
        lastMessage: {
          userName: 'User33',
          message: 'Lorem Lorem Lorem1231231321231321 Lorem Lorem Lorem Lorem ',
        },
      },
    ];
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

function* fetchGetCurrentTopic() {
  try {
    yield put(setFetchOnAC());
    //тут должен быть ForumAPI торого пока нет
    // const response: TCurrentTopic = yield call(
    //   ForumAPI.getGetCurrentTopic.bind(ForumAPI)
    // );
    const response: TCurrentTopic = {
      title: 'title from saga',
      isDisabled: false,
      userOwenerId: 11,
      messages: [
        {
          messageId: 1,
          avatarLink: null,
          userName: 'USER_1_LONG_LONG_LONG_LONG_LONG',
          time: new Date().getTime(),
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
          country: 'Russia',
          town: 'Moscow',
        },
        {
          messageId: 2,
          avatarLink: null,

          userName: 'USER_2',
          time: new Date().getTime(),
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
          country: 'Russia',
          town: 'Moscow',
        },
        {
          messageId: 3,
          avatarLink: null,

          userName: 'USER_3',
          time: new Date().getTime(),
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
          country: 'Russia',
          town: 'Moscow',
        },
        {
          messageId: 4,
          avatarLink: null,

          userName: 'USER_1',
          time: new Date().getTime(),
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
          country: 'Russia',
          town: 'Moscow',
        },
        {
          messageId: 5,
          userName: 'USER_5',
          avatarLink: null,

          time: new Date().getTime(),
          text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
          country: 'Russia',
          town: 'Moscow',
        },
        {
          messageId: 6,
          avatarLink: null,

          userName: 'USER_2',
          time: new Date().getTime(),
          text: 'lorem ',
        },
        {
          messageId: 7,
          avatarLink: null,

          userName: 'USER_12',
          time: new Date().getTime(),
          text: 'lorem ',
        },
        {
          messageId: 8,
          avatarLink: null,

          userName: 'USER_21',
          time: new Date().getTime(),
          text: 'lorem ',
        },
        {
          messageId: 9,
          avatarLink: null,

          userName: 'USER_211',
          time: new Date().getTime(),
          text: 'lorem ',
        },
      ],
    };
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
    //тут должен быть ForumAPI
    //  yield call(
    //   ForumAPI.getCloseTopic.bind(ForumAPI),
    //   payload
    // );
    console.log('topic disabled');

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
    //тут должен быть ForumAPI
    //  const newTopicId = yield call(
    //   ForumAPI.createTopic.bind(ForumAPI),
    //   payload
    // );
    const newTopicId = 4;
    console.log('created!', payload);
    yield put(getCurrentTopicAC(newTopicId));
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
    //тут должен быть ForumAPI
    //  const message = yield call(
    //   ForumAPI.sendMessage.bind(ForumAPI),
    //   payload
    // );
    console.log('message ok!', payload);
    yield put(getCurrentTopicAC(payload.topicId));
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
