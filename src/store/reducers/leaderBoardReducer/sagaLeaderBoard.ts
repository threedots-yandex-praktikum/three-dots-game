import { TakeableChannel } from "redux-saga";
import { actionChannel, put, takeEvery } from "redux-saga/effects";
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from "../../../modules/notification";
import { setErrorAC } from "../authReducer/authActionCreators";
import {
  setFetchOffAC,
  setFetchOnAC,
} from "../fetchReducer/fetchActionCreators";
import { setTableAC } from "./leaderBoardActionCreators";
import { ELeaderActions, TLeaderRow } from "./types";

function* fetchLeaderBoard() {
  try {
    yield put(setFetchOnAC());

    // const response: TLeaderRow[] = yield call(
    //   LeaderBoardAPI.getLeaderBoard.bind(LeaderBoardAPI)
    // );
    const response: TLeaderRow[] = [
      { id: 1, userName: "user1", score: 20 },
      { id: 2, userName: "user2", score: 20 },
      { id: 3, userName: "user3", score: 20 },
      { id: 4, userName: "user4", score: 40 },
      { id: 5, userName: "user5", score: 52 },
      { id: 6, userName: "user6", score: 10 },
      { id: 7, userName: "userwerwerwerwer 2342432342342342347", score: 3 },
    ];
    yield put(setTableAC(response));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchLeaderBoard() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    ELeaderActions.GET_TABLE
  );
  yield takeEvery(channel, fetchLeaderBoard);
}
