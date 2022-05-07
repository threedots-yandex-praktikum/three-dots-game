import { TSignInData } from "modules/api/authAPI";
import { call, put } from "redux-saga/effects";
import { UserController } from "../../../controllers/UserController";
import {
  setFetchOffAC,
  setFetchOnAC,
} from "../fetchReducer/fetchActionCreators";
import { setUserAC } from "./authActionCreators";
import { ELoginActions, TAuthState } from "./types";

import * as Effects from "redux-saga/effects"; //TODO без этого вылезает ошибка
const takeEvery: any = Effects.call;

function* fetchSignIn(data: TSignInData) {
  try {
    yield put(setFetchOnAC());

    const response: TAuthState = yield call(UserController.signIn, data);
    yield put(setUserAC(response));

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
  }
}

export function* watchAuth() {
  yield takeEvery(ELoginActions.LOGIN, fetchSignIn);
}
