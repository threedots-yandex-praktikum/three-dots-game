import {
  loginAC,
  logoutAC,
  registrationAC,
  setErrorAC,
  registrationYaOAuthAC,
  loginYaOAuthAC,
} from './authActionCreators';
import { AuthAPI } from '../../../modules/api/authAPI';
import { actionChannel, call, put, takeEvery } from 'redux-saga/effects';
import {
  setFetchOffAC,
  setFetchOnAC,
} from '../fetchReducer/fetchActionCreators';
import { ELoginActions } from './types';
import { TakeableChannel } from 'redux-saga';
import { TProfileState, TServiceIdState } from '../profileReducer/types';
import {
  resetUserAC,
  setUserAC,
} from '../profileReducer/profileActionCreators';
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from '../../../modules/notification';
import _identity from 'lodash/identity';

function* fetchSignIn({ cb }: ReturnType<typeof loginAC>) {  
  try {
    yield put(setFetchOnAC());
    const response: TProfileState = yield call(
      AuthAPI.getUserData.bind(AuthAPI),
    );
    yield put(setUserAC(response));
    yield put(setFetchOffAC());
    sendNotification(
      'Приветствуем Тебя в ThreeDots!',
      NOTIFICATION_LEVEL.SUCCESS,
    );

    cb();
  } catch (error) {
    sendNotification('Ошибка сети, повторите позже', NOTIFICATION_LEVEL.ERROR);
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
    cb();
  }
}

export function* watchSignIn() {
  const channel: TakeableChannel<ReturnType<typeof loginAC>> =
    yield actionChannel(ELoginActions.LOGIN);
  yield takeEvery(channel, fetchSignIn);
}

function* fetchSignUp({
  payload: data,
  cb,
}: ReturnType<typeof registrationAC>) {
  try {
    yield put(setFetchOnAC());

    let response: TProfileState = yield call(
      AuthAPI.signUp.bind(AuthAPI),
      data,
    );
    response = { ...data, id: response.id };
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
    sendNotification(
      'Пользователь успешно зарегистрирован',
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
export function* watchRegister() {
  const channel: TakeableChannel<ReturnType<typeof registrationAC>> =
    yield actionChannel(ELoginActions.REGISTER);
  yield takeEvery(channel, fetchSignUp);
}

function* fetchLogout({ cb }: ReturnType<typeof logoutAC>) {
  try {
    yield put(setFetchOnAC());

    yield call(AuthAPI.logOut.bind(AuthAPI));

    yield put(resetUserAC());

    yield put(setFetchOffAC());
    sendNotification('Пользователь вышел из системы', NOTIFICATION_LEVEL.INFO);
    cb();
    sessionStorage.clear();
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
    cb();
  }
}

export function* watchLogout() {
  const channel: TakeableChannel<ReturnType<typeof logoutAC>> =
    yield actionChannel(ELoginActions.LOGOUT);
  yield takeEvery(channel, fetchLogout);
}

export function* watchRegisterYa() {
  const channel: TakeableChannel<ReturnType<typeof registrationYaOAuthAC>> =
    yield actionChannel(ELoginActions.REGISTER_YA_OAUTH);
  yield takeEvery(channel, fetchSignUpYa);
}

function* fetchSignUpYa() {
  try {
    yield put(setFetchOnAC());
    const response: TServiceIdState = yield call(
      AuthAPI.getYaOAuthServiceId.bind(AuthAPI),
    );
    const serviceId = response.service_id;
    yield call(
      AuthAPI.redirectYaOAuth.bind(AuthAPI, serviceId),
    );

  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);

  }
}

export function* watchSignInYa() {
  const channel: TakeableChannel<ReturnType<typeof loginYaOAuthAC>> =
    yield actionChannel(ELoginActions.LOGIN_YA_OAUTH);
  yield takeEvery(channel, fetchSignInYa);
}


function* fetchSignInYa({ payload }: ReturnType<typeof loginYaOAuthAC>) {  
  try {
    yield put(setFetchOnAC());
    yield call(
      AuthAPI.sendCodeAuthYa.bind(AuthAPI, payload ),
    );
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    yield put(loginAC(()=>{}));
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);

  }
}
