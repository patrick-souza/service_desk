import { fork, all, call, put, takeLatest, select } from 'redux-saga/effects';
import { IReducerAction, IApplicationState } from '..';
import {
  PostCancelCardSuccess,
  cancelCardError,
  HideDialogCancelCard,
  fetchHistoricSuccess,
  fetchHistoric,
} from './actions';
import { CancelCardActionTypes, IHistoricCancel } from './types';
import endpoints from 'Config/endpoints';
import { formatDate } from 'App/Util/format';
import { notification } from 'antd';
import API from 'App/Services/Api';
import { updateStateCard } from '../Card';
import { fetchReasons, ReasonsGroups } from '../Reasons';

function* cancelCard(
  action: IReducerAction<{ reason: number; description: string }>
): Generator {
  try {
    const { reason, description } = action.payload;

    const cardCode = (yield select(
      (state: IApplicationState) => state.cancelCard.cardCode
    )) as number;

    const response = (yield call(
      API.post,
      `${endpoints.telaunica_api}/cards/${cardCode}/cancel`,
      { reason, description }
    )) as { message: string };

    yield put(PostCancelCardSuccess());
    notification.success({ message: response.message as string });
    yield put(updateStateCard(cardCode, 'C'));

    yield put(HideDialogCancelCard());
  } catch (error) {
    yield put(cancelCardError());
    error.data.errors.map((e: any) =>
      notification.error({ message: e.message })
    );
  }
}
function* handledata(): Generator {
  yield all([
    put(fetchReasons(ReasonsGroups.CANCEL_CARD)),
    put(fetchHistoric()),
  ]);
}

function* handleHistory(): Generator {
  try {
    const cardCode = (yield select(
      (state: IApplicationState) => state.cancelCard.cardCode
    )) as number;

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/historic/cancel/cardId/${cardCode}`
    )) as IHistoricCancel[];

    const historics = response.map(row => ({
      ...row,
      formatted_createdAt:
        formatDate(new Date(row.createdAt), 'DD/MM/YYYY [-] HH:mm[h]') || '-',
    }));

    yield put(fetchHistoricSuccess(historics));
  } catch (error) {
    yield put(cancelCardError());
  }
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(CancelCardActionTypes.POST, cancelCard),
    takeLatest(CancelCardActionTypes.SHOW_DIALOG, handledata),
    takeLatest(CancelCardActionTypes.FETCH_HISTORIC, handleHistory),
  ]);
}

export function* cancelCardSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
