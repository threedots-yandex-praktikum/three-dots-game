import { ProfileAPI } from 'modules/api/profileAPI';
import { TakeableChannel } from 'redux-saga';
import { actionChannel, call, putResolve, takeEvery } from 'redux-saga/effects';
import { setErrorAC } from '../authReducer/authActionCreators';
import {
  setFetchOffAC,
  setFetchOnAC,
} from '../fetchReducer/fetchActionCreators';
import {
  changeAvatarAC,
  changeProfileAC,
  setUserAC,
} from './profileActionCreators';
import { EProfileActions, TProfileState } from './types';

function* fetchChangeProfile({
  payload: data,
}: ReturnType<typeof changeProfileAC>) {
  try {
    console.log(data, 'data fetchChangeProfile');

    yield putResolve(setFetchOnAC());

    const response: TProfileState = yield call(
      ProfileAPI.changeProfile.bind(ProfileAPI),
      data,
    );
    console.log(response, 'response');
    yield putResolve(setUserAC(response));

    yield putResolve(setFetchOffAC());
  } catch (error) {
    yield putResolve(setFetchOffAC());
    yield putResolve(setErrorAC(error as Error));
  }
}

export function* watchChangeProfile() {
  const channel: TakeableChannel<ReturnType<typeof changeProfileAC>> =
    yield actionChannel(EProfileActions.CHANGE_PROFILE);
  yield takeEvery(channel, fetchChangeProfile);
}

function* fetchChangePassword({
  payload: data,
}: ReturnType<typeof changeProfileAC>) {
  try {
    yield putResolve(setFetchOnAC());
    // @ts-ignore
    yield call(ProfileAPI.changePassword.bind(ProfileAPI), data);
    yield putResolve(setFetchOffAC());
  } catch (error) {
    yield putResolve(setFetchOffAC());
    yield putResolve(setErrorAC(error as Error));
  }
}

export function* watchChangePassword() {
  const channel: TakeableChannel<ReturnType<typeof changeProfileAC>> =
    yield actionChannel(EProfileActions.CHANGE_PASSWORD);
  yield takeEvery(channel, fetchChangePassword);
}

function* fetchChangeAvatar({
  payload: data,
}: ReturnType<typeof changeAvatarAC>) {
  try {
    yield putResolve(setFetchOnAC());
    const response: TProfileState = yield call(
      ProfileAPI.changeAvatar.bind(ProfileAPI),
      data,
    );
    yield putResolve(setUserAC(response));
    yield putResolve(setFetchOffAC());
  } catch (error) {
    yield putResolve(setFetchOffAC());
    yield putResolve(setErrorAC(error as Error));
  }
}

export function* watchChangeAvatar() {
  const channel: TakeableChannel<ReturnType<typeof changeAvatarAC>> =
    yield actionChannel(EProfileActions.CHANGE_AVATAR);
  yield takeEvery(channel, fetchChangeAvatar);
}
