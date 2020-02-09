import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { authReducer, IAuthState, authSaga } from './Auth';
import { weatherReducer, weatherSaga, IWeatherState } from './Weather';
import { IQuoteState, quoteReducer, quoteSaga } from './Quote';
import { ISearchState, searchReducer, searchSaga } from './Search';
import { IBearerState, bearerReducer, bearerSaga } from './Bearer';
import { ICardState, cardsReducer, cardsSaga } from './Card';

export type IApplicationState = {
  auth: IAuthState;
  weather: IWeatherState;
  quote: IQuoteState;
  search: ISearchState;
  bearer: IBearerState;
  card: ICardState;
};

export type IReducerAction<T> = { type: string; payload: T };

const reducers = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  quote: quoteReducer,
  search: searchReducer,
  bearer: bearerReducer,
  card: cardsReducer,
});

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(weatherSaga),
    fork(quoteSaga),
    fork(searchSaga),
    fork(bearerSaga),
    fork(cardsSaga),
  ]);
}

export default { reducers, rootSaga };
