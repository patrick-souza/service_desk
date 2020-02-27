import { call, put, takeLatest, all } from 'redux-saga/effects';
import endpoints from 'Config/endpoints';
import { formatDate } from 'App/Util/format';
import API from 'App/Services/Api';
import { notification } from 'antd';
import { IReducerAction } from '..';
import {
  fetchOrderError,
  fetchOrderSuccess,
  HideDialogOrderCard,
} from './actions';
import { IOrder, OrderActionTypes } from './types';

function* handleOrder(action: IReducerAction<number>): Generator {
  try {
    const url = `${endpoints.telaunica_api}/tracking/${action.payload}`;
    const response = (yield call(API.get, url)) as IOrder;
    const order: IOrder = {
      ...response,
      card_code: Number(response.card_code),
      formatted_created_at: formatDate(
        new Date(response.created_at),
        'DD/MM/YYYY'
      ),

      formatted_unlocked_at: response.unlocked_at
        ? formatDate(new Date(response.unlocked_at), 'DD/MM/YYYY')
        : '-',

      verify_unlock_channel: response.unlock_channel
        ? response.unlock_channel
        : '-',

      formatted_address: `${response.end_customer.shipping_address}, ${response.end_customer.shipping_number} ${response.end_customer.shipping_quarter} - ${response.end_customer.shipping_city}, ${response.end_customer.shipping_state}
      ${response.end_customer.shipping_zip_code}`,
    };
    yield put(fetchOrderSuccess(order));
  } catch (error) {
    yield all([put(fetchOrderError()), put(HideDialogOrderCard())]);
    if (error.status === 404)
      error.data.errors.map((e: any) =>
        notification.error({ message: 'Oops!', description: e.message })
      );
  }
}

export default function* orderSaga(): Generator {
  yield all([takeLatest(OrderActionTypes.SHOW_DIALOG, handleOrder)]);
}
