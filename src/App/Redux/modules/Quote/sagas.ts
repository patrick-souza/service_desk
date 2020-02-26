import { takeLatest, all, select, call, put } from 'redux-saga/effects';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import { QuoteActionTypes, IQuote } from './types';
import { IApplicationState } from '..';
import { fetchSuccess, fetchError } from './actions';

function* handleQuote(): Generator {
  try {
    const userId = yield select(({ auth }: IApplicationState) => {
      let id = '0';
      if (auth.user) {
        id = auth.user.id;
      }
      return id;
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

export default function* quoteSaga(): Generator {
  yield all([takeLatest(QuoteActionTypes.FETCH, handleQuote)]);
}
