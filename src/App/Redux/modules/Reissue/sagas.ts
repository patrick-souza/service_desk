import { all, fork, takeLatest, put, select, call } from 'redux-saga/effects';

import { IReducerAction, IApplicationState } from '..';
import {
  postReissueCardSuccess,
  reissueCardError,
  fetchHistoricSuccess,
  hideDialogReissueCard,
  fetchHistoric,
} from './actions';
import endpoints from 'Config/endpoints';
import {
  IReissueCard,
  IHistoricReissueCard,
  ReissueActionTypes,
} from './types';
import API from 'App/Services/Api';
import { formatDate } from 'App/Util/format';
import { fetchReasons, ReasonsGroups } from '../Reasons';
import { notification } from 'antd';

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
        card_id: cardId,
        reason_id: action.payload.reason,
      }
    );

    yield all([put(postReissueCardSuccess()), put(hideDialogReissueCard())]);

    notification.success({ message: response.message });
  } catch (err) {
    if (err.data.errors)
      err.data.errors.map((e: any) =>
        notification.error({ message: e.message })
      );

    yield put(reissueCardError());
  }
}
function* handleHistoric(): Generator {
  try {
    const cardCode = (yield select(
      (state: IApplicationState) => state.reissue.cardCode
    )) as number;

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/historic/cardReissue/cardId/${cardCode}`
    )) as IHistoricReissueCard[];

    const historics = response.map(row => ({
      ...row,
      formatted_createdAt:
        formatDate(new Date(row.createdAt), 'DD/MM/YYYY [-] HH:mm[h]') || '-',
    }));
    yield put(fetchHistoricSuccess(historics));
  } catch (error) {
    yield put(reissueCardError());
  }
}

function* handleShowDialog(): Generator {
  try {
    yield all([
      put(fetchReasons(ReasonsGroups.REISSUE_CARD)),
      put(fetchHistoric()),
    ]);
  } catch (error) {}
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(ReissueActionTypes.SHOW_DIALOG, handleShowDialog),
    takeLatest(ReissueActionTypes.POST, postReissueCard),
    takeLatest(ReissueActionTypes.FETCH_HISTORIC, handleHistoric),
  ]);
}

export function* reissueSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
