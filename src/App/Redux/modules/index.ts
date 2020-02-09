import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { authReducer, IAuthState, authSaga } from './Auth';
import { weatherReducer, weatherSaga, IWeatherState } from './Weather';
import { IQuoteState, quoteReducer, quoteSaga } from './Quote';
import { ISearchState, searchReducer, searchSaga } from './Search';

export type IApplicationState = {
  auth: IAuthState;
  weather: IWeatherState;
  quote: IQuoteState;
  search: ISearchState;
};

export type IReducerAction<T> = { type: string; payload: T };

const reducers = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  quote: quoteReducer,
  search: searchReducer,
});

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(weatherSaga),
    fork(quoteSaga),
    fork(searchSaga),
  ]);
}

export default { reducers, rootSaga };
