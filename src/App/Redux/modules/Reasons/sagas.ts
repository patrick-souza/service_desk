import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import { ReasonActionTypes, ReasonsGroups, IReason } from './types';
import { fetchReasonsSuccess, fetchReasonsError } from './actions';
import { IReducerAction } from '..';

function* handleReason(action: IReducerAction<ReasonsGroups>): Generator {
  try {
    const reasons = (yield call(
      API.get,
      `${endpoints.telaunica_api}/reason/${action.payload}`
    )) as IReason[];

    yield put(fetchReasonsSuccess(reasons));
  } catch (err) {
    yield put(fetchReasonsError());
  }
}

function* watchFetchRequest(): Generator {
  yield takeLatest(ReasonActionTypes.FETCH_REASON, handleReason);
}

export default function* reasonSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
