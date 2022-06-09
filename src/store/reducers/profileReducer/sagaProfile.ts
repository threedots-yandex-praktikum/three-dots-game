import { ProfileAPI } from 'modules/api/profileAPI';
import { TakeableChannel } from 'redux-saga';
import { actionChannel, call, put, takeEvery } from 'redux-saga/effects';
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
  changeAvatarAC,
  changeProfileAC,
  resetPasswordAC,
  setUserAC,
} from './profileActionCreators';
import { EProfileActions, TProfileState } from './types';

function* fetchChangeProfile({
  payload: data,
  cb,
}: ReturnType<typeof changeProfileAC>) {
  try {
    yield put(setFetchOnAC());

    const response: TProfileState = yield call(
      ProfileAPI.changeProfile.bind(ProfileAPI),
      data,
    );
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
    sendNotification(
      'Данные пользователя успешно изменены',
      NOTIFICATION_LEVEL.SUCCESS,
    );
    cb();
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
    cb();
  }
}

export function* watchChangeProfile() {
  const channel: TakeableChannel<ReturnType<typeof changeProfileAC>> =
    yield actionChannel(EProfileActions.CHANGE_PROFILE);
  yield takeEvery(channel, fetchChangeProfile);
}

function* fetchChangePassword({
  payload: data,
}: ReturnType<typeof resetPasswordAC>) {
  try {
    yield put(setFetchOnAC());
    yield call(ProfileAPI.changePassword.bind(ProfileAPI), data);
    yield put(setFetchOffAC());
    sendNotification('Пароль успешно обновлен', NOTIFICATION_LEVEL.SUCCESS);
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchChangePassword() {
  const channel: TakeableChannel<ReturnType<typeof resetPasswordAC>> =
    yield actionChannel(EProfileActions.CHANGE_PASSWORD);
  yield takeEvery(channel, fetchChangePassword);
}

function* fetchChangeAvatar({
  payload: data,
  cb,
}: ReturnType<typeof changeAvatarAC>) {
  try {
    yield put(setFetchOnAC());
    const response: TProfileState = yield call(
      ProfileAPI.changeAvatar.bind(ProfileAPI),
      data,
    );
    yield put(setUserAC(response));
    yield put(setFetchOffAC());
    sendNotification('Аватар успешно обновлен', NOTIFICATION_LEVEL.SUCCESS);
    cb();
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
    cb();
  }
}

export function* watchChangeAvatar() {
  const channel: TakeableChannel<ReturnType<typeof changeAvatarAC>> =
    yield actionChannel(EProfileActions.CHANGE_AVATAR);
  yield takeEvery(channel, fetchChangeAvatar);
}
