import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { authReducer, IAuthState, authSaga } from './Auth';
import { weatherReducer, weatherSaga, IWeatherState } from './Weather';
import { IQuoteState, quoteReducer, quoteSaga } from './Quote';

export type IApplicationState = {
  auth: IAuthState;
  weather: IWeatherState;
  quote: IQuoteState;
};

export type IReducerAction<T> = { type: string; payload?: T };

const reducers = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  quote: quoteReducer,
});

function* rootSaga() {
  yield all([fork(authSaga), fork(weatherSaga), fork(quoteSaga)]);
}

export default { reducers, rootSaga };
