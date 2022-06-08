import { TakeableChannel } from 'redux-saga';
import {
  actionChannel,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { LeaderAPI, TAddToLBData } from '../../../modules/api/leaderBoardAPI';
import {
  NOTIFICATION_LEVEL,
  sendNotification,
} from '../../../modules/notification';
import { setErrorAC } from '../authReducer/authActionCreators';
import {
  setFetchOffAC,
  setFetchOnAC,
} from '../fetchReducer/fetchActionCreators';
import { RootState } from '../rootReducer';
import { addUserToTableAC, setTableAC } from './leaderBoardActionCreators';
import { ELeaderActions } from './types';

function* fetchLeaderBoard() {
  try {
    yield put(setFetchOnAC());

    const response: Array<{ data: TAddToLBData }> = yield call(
      LeaderAPI.getThreeDotsLeaders.bind(LeaderAPI),
    );

    const tableBeaders = Array.from(response, (row) => row.data);
    yield put(setTableAC(tableBeaders));
    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchLeaderBoard() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    ELeaderActions.GET_TABLE,
  );
  yield takeEvery(channel, fetchLeaderBoard);
}

function* fetchAddUserToLB() {
  try {
    yield put(setFetchOnAC());
    const { id, display_name } = yield select(
      (state: RootState) => state.profileReducer,
    );
    const { player } = yield select((state: RootState) => state.gameReducer);
    const data: TAddToLBData = {
      score: player.scores,
      id,
      userName: display_name,
    };
    yield call(LeaderAPI.addUser.bind(LeaderAPI), { ...data });

    yield put(setFetchOffAC());
  } catch (error) {
    yield put(setFetchOffAC());
    yield put(setErrorAC(error as Error));
    sendNotification((error as Error)?.message, NOTIFICATION_LEVEL.ERROR);
  }
}

export function* watchAddUserToLB() {
  const channel: TakeableChannel<ReturnType<typeof addUserToTableAC>> =
    yield actionChannel(ELeaderActions.ADD_USER_TO_LB);
  yield takeEvery(channel, fetchAddUserToLB);
}
