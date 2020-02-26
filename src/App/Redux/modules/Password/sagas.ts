import { select, call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import endpoints from 'Config/endpoints';
import { formatDate } from 'App/Util/format';
import API from 'App/Services/Api';
import {
  fetchHistoricSuccess,
  resendPasswordError,
  fetchHistoric,
  postResendPasswordSuccess,
  hideDialogResendPassword,
} from './actions';
import { IApplicationState, IReducerAction } from '..';
import {
  IHistoricResendPassword,
  HistoricResendPasswordActionTypes,
} from './types';

function* handlePostResendPassword(
  action: IReducerAction<{ type: string; recipient: string }>
): Generator {
  try {
    const { recipient, type } = action.payload;

    const cardCode = yield select(
      (state: IApplicationState) => state.historicResendPassword.cardCode
    );

    yield call(API.post, `${endpoints.telaunica_api}/resendPass`, {
      recipient,
      type,
      card_id: cardCode,
    });

    yield put(postResendPasswordSuccess());
    yield put(hideDialogResendPassword());

    notification.success({ message: 'Senha enviada com sucesso' });
  } catch (err) {
    if (err.data.errors)
      err.data.errors.foreach((e: any) =>
        notification.error({ message: e.message })
      );
    yield put(resendPasswordError());
  }
}
function* handleHistoricPassword(): Generator {
  try {
    const cardCode = yield select(
      (state: IApplicationState) => state.historicResendPassword.cardCode
    );

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/historic/resendpassword/cardId/${cardCode}`
    )) as IHistoricResendPassword[];

    const historic = response.map(row => ({
      ...row,
      formatedDate: formatDate(
        new Date(row.createdAt),
        'DD/MM/YYYY [-] HH:mm[h]'
      ),
    }));

    yield put(fetchHistoricSuccess(historic));
  } catch (error) {
    yield put(resendPasswordError());
    if (error.data.errors)
      error.data.errors.foreach((e: any) =>
        notification.error({ message: e.message })
      );
  }
}
function* handleShowDialog(): Generator {
  yield all([put(fetchHistoric())]);
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(HistoricResendPasswordActionTypes.SHOW_DIALOG, handleShowDialog),
    takeLatest(
      HistoricResendPasswordActionTypes.FETCH_HISTORIC,
      handleHistoricPassword
    ),
    takeLatest(
      HistoricResendPasswordActionTypes.POST,
      handlePostResendPassword
    ),
  ]);
}

export function* historicResendPasswordSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
