import { registrationAC, setErrorAC } from './authActionCreators';
import { AuthAPI } from '../../../modules/api/authAPI';
import { actionChannel, call, put, take, takeEvery } from 'redux-saga/effects';
import {
  setFetchOffAC,
  setFetchOnAC,
} from '../fetchReducer/fetchActionCreators';
import { ELoginActions } from './types';
import { TakeableChannel } from 'redux-saga';
import { TProfileState } from '../profileReducer/types';
import {
  resetUserAC,
  setUserAC,
} from '../profileReducer/profileActionCreators';

function* fetchSignIn() {
  try {
    yield put(setFetchOnAC());

    const response: TProfileState = yield call(
      AuthAPI.getUserData.bind(AuthAPI),
    );
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
  }
}

export function* watchSignIn() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    ELoginActions.LOGIN,
  );
  while (true) {
    yield take(channel);
    yield call(fetchSignIn);
  }
}

function* fetchSignUp({ payload: data }: ReturnType<typeof registrationAC>) {
  try {
    yield put(setFetchOnAC());

    let response: TProfileState = yield call(
      AuthAPI.signUp.bind(AuthAPI),
      data,
    );
    response = { ...data, id: response.id };
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
  }
}
export function* watchRegister() {
  const channel: TakeableChannel<ReturnType<typeof registrationAC>> =
    yield actionChannel(ELoginActions.REGISTER);
  yield takeEvery(channel, fetchSignUp);
}

function* fetchLogout() {
  try {
    yield put(setFetchOnAC());

    yield call(AuthAPI.logOut.bind(AuthAPI));

    yield put(resetUserAC());

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
  }
}

export function* watchLogout() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    ELoginActions.LOGOUT,
  );
  while (true) {
    yield take(channel);
    yield call(fetchLogout);
  }
}
