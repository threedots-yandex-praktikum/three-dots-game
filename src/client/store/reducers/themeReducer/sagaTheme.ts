import { TakeableChannel } from "redux-saga";
import { actionChannel, call, put, takeEvery } from "redux-saga/effects";
import { getCandidate } from "../../../../server/middlewares/syncronizeDBMiddleware";
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
import {
  changeThemeAC,
  getThemeAC,
  setDarkAC,
  setLightAC,
} from "./themeActionCreators";
import { EThemesActions } from "./types";

function* fetchChangeTheme({
  payload: themeAsBoolean,
}: ReturnType<typeof changeThemeAC>) {
  try {
    yield put(setFetchOnAC());

    const theme = themeAsBoolean ? userTheme.DARK : userTheme.LIGHT;
    const response: userTheme = yield call(
      ThemeAPI.changeTheme.bind(ThemeAPI),
      theme
    );
    if (response === userTheme.DARK) {
      yield put(setDarkAC());
    }
    if (response === userTheme.LIGHT) {
      yield put(setLightAC());
    }
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

function* fetchGetTheme({ payload }: ReturnType<typeof getThemeAC>) {
  try {
    console.log("fetchGetTheme ");
    yield put(setFetchOnAC());
    const { id, first_name } = payload;
    const response: Generator<userTheme> = yield call(
      getCandidate,
      id,
      first_name
    );

    if ((response as unknown as userTheme) === userTheme.DARK) {
      yield put(setDarkAC());
    }
    if ((response as unknown as userTheme) === userTheme.LIGHT) {
      yield put(setLightAC());
    }
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
