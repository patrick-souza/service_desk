import { all, takeLatest, fork, call, put } from 'redux-saga/effects';
import { BearerActionTypes, IBearer } from './types';
import { IReducerAction } from '..';
import { fetchSuccess, fetchError } from './actions';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import {
  format_cnpj,
  format_cpf,
  formatDate,
  format_phone,
} from 'App/Util/format';

export function* handleBearer(action: IReducerAction<number>): Generator {
  try {
    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/cardholders/${action.payload}`
    )) as IBearer;

    const bearer: IBearer = {
      ...response,
      born: response.born,
      address: response.address,
      city: response.city,
      email: response.email,
      name: response.name,
      state: response.state,
      zip_code: response.zip_code,
      formatted_document:
        response.type === 'PJ'
          ? format_cnpj(response.document)
          : format_cpf(response.document),
      formatted_born: !!response.born
        ? formatDate(new Date(response.born), 'DD/MM/YYYY')
        : '',
      formatted_phone: format_phone(response.phone),
      tier: '',
    };

    yield put(fetchSuccess(bearer));
  } catch (err) {
    yield put(fetchError());
  }
}

function* watchFetchRequest(): Generator {
  yield takeLatest(BearerActionTypes.FETCH, handleBearer);
}

export function* bearerSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
