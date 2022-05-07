import { all } from "redux-saga/effects";
import { watchAuth } from "./reducers/authReducer/sagaAuth";

export default function* rootSaga() {
  yield all([watchAuth()]);
}
