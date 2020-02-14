import { all, fork, takeLatest, put, select, call } from 'redux-saga/effects';
import { ReissueActionTypes, IReissueCard } from './types';
import { IReducerAction, IApplicationState } from '..';
import { postReissueCardSuccess, reissueCardError } from './actions';
import endpoints from 'Config/endpoints';
import { fetchReasons, ReasonsGroups } from '../Reasons';
import { notification } from 'antd';
import API from 'App/Services/Api';

function* postReissueCard(action: IReducerAction<IReissueCard>) {
  try {
    const cardId = yield select(
      (state: IApplicationState) => state.reissue.cardCode
    );

    const response = yield call(
      API.post,
      `${endpoints.telaunica_api}/cards/reissue`,
      {
        ...action.payload,
        cardCode: cardId,
        reason_id: action.payload.reason,
      }
    );

    yield put(postReissueCardSuccess());
    notification.success({ message: response.message });
  } catch (err) {
    if (err.data.errors)
      err.data.errors.map((e: any) =>
        notification.error({ message: e.message })
      );

    yield put(reissueCardError());
  }
}
function* handleShowDialog(): Generator {
  try {
    yield all([put(fetchReasons(ReasonsGroups.REISSUE_CARD))]);
  } catch (error) {}
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(ReissueActionTypes.SHOW_DIALOG, handleShowDialog),
    takeLatest(ReissueActionTypes.POST, postReissueCard),
  ]);
}

export function* reissueSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
