import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { authReducer, IAuthState, authSaga } from './Auth';
import { weatherReducer, weatherSaga, IWeatherState } from './Weather';
import { IQuoteState, quoteReducer, quoteSaga } from './Quote';
import { ISearchState, searchReducer, searchSaga } from './Search';
import { IBearerState, bearerReducer, bearerSaga } from './Bearer';
import { ICardState, cardsReducer, cardsSaga } from './Card';
import { IBlockCardState, blockCardReducer, blockCardSaga } from './Block';
import { ICancelCardState, cancelCardReducer, cancelCardSaga } from './Cancel';
import {
  IHistoricResendPasswordState,
  historicResendPasswordReducer,
  historicResendPasswordSaga,
} from './Password';
import { IReasonState, reasonReducer, reasonSaga } from './Reasons';
import { IOrderState, orderReducer, orderSaga } from './Orders';
import { IExtractState, extractReducer, extractSaga } from './Extract';

export type IApplicationState = {
  auth: IAuthState;
  weather: IWeatherState;
  quote: IQuoteState;
  search: ISearchState;
  bearer: IBearerState;
  card: ICardState;
  blockCard: IBlockCardState;
  cancelCard: ICancelCardState;
  reason: IReasonState;
  historicResendPassword: IHistoricResendPasswordState;
  order: IOrderState;
  extract: IExtractState;
};

export type IReducerAction<T> = { type: string; payload: T };

const reducers = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  quote: quoteReducer,
  search: searchReducer,
  bearer: bearerReducer,
  card: cardsReducer,
  blockCard: blockCardReducer,
  cancelCard: cancelCardReducer,
  reason: reasonReducer,
  historicResendPassword: historicResendPasswordReducer,
  order: orderReducer,
  extract: extractReducer,
});

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(weatherSaga),
    fork(quoteSaga),
    fork(searchSaga),
    fork(bearerSaga),
    fork(cardsSaga),
    fork(blockCardSaga),
    fork(cancelCardSaga),
    fork(reasonSaga),
    fork(historicResendPasswordSaga),
    fork(orderSaga),
    fork(extractSaga),
  ]);
}

export default { reducers, rootSaga };
