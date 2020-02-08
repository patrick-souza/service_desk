import { takeLatest, all, select, call, put } from 'redux-saga/effects';
import { QuoteActionTypes, IQuote } from './types';
import { IApplicationState } from '..';
import { fetchSuccess, fetchError } from './actions';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';

export function* handleQuote(): Generator {
  try {
    const userId = yield select(({ auth }: IApplicationState) => {
      let userId = '0';
      if (auth.user) {
        userId = auth.user.id;
      }
      return userId;
    });

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/requestQuote/${userId}`
    )) as IQuote;

    yield put(fetchSuccess(response));
  } catch (error) {
    yield put(fetchError());
  }
}

export function* quoteSaga(): Generator {
  yield all([takeLatest(QuoteActionTypes.FETCH, handleQuote)]);
}
