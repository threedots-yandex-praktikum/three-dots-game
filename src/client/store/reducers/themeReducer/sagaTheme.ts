import { TakeableChannel } from "redux-saga";
import {
  actionChannel,
  call,
  CallEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import { userTheme } from "../../../../server/models/user";
import { ThemeAPI } from "../../../modules/api/themeAPI";
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from "../../../modules/notification";
import { setErrorAC } from "../authReducer/authActionCreators";
import {
  setFetchOffAC,
  setFetchOnAC,
} from "../fetchReducer/fetchActionCreators";
import { changeThemeAC, getThemeAC } from "./themeActionCreators";
import { EThemesActions } from "./types";

function* fetchChangeTheme({
  payload: themeAsBoolean,
}: ReturnType<typeof changeThemeAC>) {
  try {
    yield put(setFetchOnAC());

    const theme = themeAsBoolean ? userTheme.DARK : userTheme.LIGHT;
    const response: CallEffect<userTheme> = yield call(
      ThemeAPI.changeTheme.bind(ThemeAPI),
      theme
    );
    console.log(response, "fetchChangeTheme");
    yield put(setFetchOffAC());
    sendNotification(
      "Тема пользователя успешно изменена",
      NOTIFICATION_LEVEL.SUCCESS
    );
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchChangeTheme() {
  const channel: TakeableChannel<ReturnType<typeof changeThemeAC>> =
    yield actionChannel(EThemesActions.CHANGE_THEME);
  yield takeEvery(channel, fetchChangeTheme);
}

function* fetchGetTheme() {
  try {
    yield put(setFetchOnAC());

    const response: Generator<userTheme> = yield call(
      ThemeAPI.getTheme.bind(ThemeAPI)
    );
    console.log(response, "fetchGetTheme");

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchGetTheme() {
  const channel: TakeableChannel<ReturnType<typeof getThemeAC>> =
    yield actionChannel(EThemesActions.GET_THEME);
  yield takeEvery(channel, fetchGetTheme);
}
