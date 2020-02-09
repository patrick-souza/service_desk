import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { IReducerAction, IApplicationState } from '..';
import { IResultSearch, SearchActionTypes, ITypeOfSearch } from './types';
import { SearchError, hideDialog, dataSuccess } from './actions';
import { notification } from 'antd';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import history from 'App/Util/history';
import { fetchBearer } from '../Bearer';
import { fetchCards } from '../Card';

export function* handleBearer(
  action: IReducerAction<{ typeOfSearch: ITypeOfSearch; termOfSearch: string }>
): Generator {
  try {
    notification.destroy();

    const { typeOfSearch, termOfSearch } = action.payload;
    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/cards/search?type=${typeOfSearch}&value=${termOfSearch}`
    )) as IResultSearch[];

    yield put(dataSuccess(response));

    if (typeOfSearch === 'ORDER_ID' || typeOfSearch === 'ORDER_ITEM_ID') return;
    else {
      yield put(hideDialog());

      const cardCodes = response.reduce(
        (codes: number[], result) => [...codes, result.card_code],
        []
      );

      const [firstCard] = response;

      yield all([
        put(fetchCards({ cardCodes, state: 'T' })),
        put(fetchBearer(firstCard.cardholder_id)),
      ]);

      history.push('/bearer');
    }
  } catch (err) {
    if (err.data.errors) {
      const [error] = err.data.errors;
      notification.error({ message: error.message });
    }
    yield put(SearchError());
  }
}
function* selectCardOnSearch(action: IReducerAction<number>): Generator {
  try {
    const cardSelected = (yield select((state: IApplicationState) =>
      state.search.result.find(r => r.card_code === action.payload)
    )) as IResultSearch;

    yield put(dataSuccess([cardSelected]));
    yield put(hideDialog());
    yield all([
      put(fetchCards({ cardCodes: [cardSelected.card_code], state: 'T' })),
      put(fetchBearer(cardSelected.cardholder_id)),
    ]);

    history.push('/bearer');
  } catch (error) {
    yield put(SearchError());
  }
}

export function* searchSaga(): Generator {
  yield all([
    takeLatest(SearchActionTypes.FETCH, handleBearer),
    takeLatest(SearchActionTypes.SELECT_CARD, selectCardOnSearch),
  ]);
}
