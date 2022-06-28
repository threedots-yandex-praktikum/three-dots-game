import { EFetchActions } from './types';
import { TakeableChannel } from 'redux-saga';
import { actionChannel, put, takeEvery } from 'redux-saga/effects';
import { setErrorAC } from '../authReducer/authActionCreators';

function* onFetch() {
  yield put(setErrorAC(null));
}

export function* watchOnFetch() {
  const channel: TakeableChannel<Record<string, never>> = yield actionChannel(
    EFetchActions.FETCH_ON,
  );
  yield takeEvery(channel, onFetch);
}
