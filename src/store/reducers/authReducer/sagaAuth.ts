import {
  loginAC,
  logoutAC,
  registrationAC,
  setErrorAC,
} from "./authActionCreators";
import { AuthAPI } from "../../../modules/api/authAPI";
import { actionChannel, call, put, takeEvery } from "redux-saga/effects";
import {
  setFetchOffAC,
  setFetchOnAC,
} from "../fetchReducer/fetchActionCreators";
import { ELoginActions } from "./types";
import { TakeableChannel } from "redux-saga";
import { TProfileState } from "../profileReducer/types";
import {
  resetUserAC,
  setUserAC,
} from "../profileReducer/profileActionCreators";
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from "../../../modules/notification";

function* fetchSignIn({ cb }: ReturnType<typeof loginAC>) {
  try {
    yield put(setFetchOnAC());
    const response: TProfileState = yield call(
      AuthAPI.getUserData.bind(AuthAPI)
    );
    yield put(setUserAC(response));
    yield put(setFetchOffAC());
    sendNotification(
      "Приветствуем Тебя в ThreeDots!",
      NOTIFICATION_LEVEL.SUCCESS
    );

    cb();
  } catch (error) {
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
      data
    );
    response = { ...data, id: response.id };
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
    sendNotification(
      "Пользователь успешно зарегистрирован",
      NOTIFICATION_LEVEL.SUCCESS
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
    sendNotification("Пользователь вышел из системы", NOTIFICATION_LEVEL.INFO);
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
