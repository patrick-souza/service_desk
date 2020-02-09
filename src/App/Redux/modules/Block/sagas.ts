import { fork, all, call, put, takeLatest, select } from 'redux-saga/effects';
import { IReducerAction, IApplicationState } from '..';
import {
  postBlockCardSuccess,
  blockCardError,
  hideDialogBlockCard,
  fetchHistoricSuccess,
  fetchHistoric,
} from './actions';
import { BlockCardActionTypes, IHistoricBlock } from './types';
import endpoints from 'Config/endpoints';
import { updateStateCard } from '../Card';
import { formatDate } from 'App/Util/format';
import { notification } from 'antd';
import API from 'App/Services/Api';
import { fetchReasons, ReasonsGroups } from '../Reasons';

function* blockCard(
  action: IReducerAction<{ reason: number; description: string }>
): Generator {
  try {
    const { reason, description } = action.payload;

    const cardCode = (yield select(
      (state: IApplicationState) => state.blockCard.cardCode
    )) as number;

    const response = (yield call(
      API.post,
      `${endpoints.telaunica_api}/cards/${cardCode}/block`,
      { reason, description }
    )) as { message: string };

    yield put(postBlockCardSuccess());
    notification.success({ message: response.message as string });
    yield put(updateStateCard(cardCode, 'B'));

    yield put(hideDialogBlockCard());
  } catch (error) {
    yield put(blockCardError());
    error.data.errors.foreach((e: any) =>
      notification.error({ message: e.message })
    );
  }
}

function* handleShowDialog(): Generator {
  yield all([
    put(fetchReasons(ReasonsGroups.BLOCK_CARD)),
    put(fetchHistoric()),
  ]);
}

function* handleHistoric(): Generator {
  try {
    const cardCode = (yield select(
      (state: IApplicationState) => state.blockCard.cardCode
    )) as number;

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/historic/block/cardId/${cardCode}`
    )) as IHistoricBlock[];

    const historics = response.map(row => ({
      ...row,
      formatted_createdAt:
        formatDate(new Date(row.createdAt), 'DD/MM/YYYY [-] HH:mm[h]') || '-',
    }));

    yield put(fetchHistoricSuccess(historics));
  } catch (error) {
    yield put(blockCardError());
  }
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(BlockCardActionTypes.POST, blockCard),
    takeLatest(BlockCardActionTypes.SHOW_DIALOG, handleShowDialog),
    takeLatest(BlockCardActionTypes.FETCH_HISTORIC, handleHistoric),
  ]);
}

export function* blockCardSaga(): Generator {
  yield fork(watchFetchRequest);
}
