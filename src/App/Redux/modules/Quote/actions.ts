import { QuoteActionTypes, IQuote } from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchQuote = (): IReducerAction<{}> =>
  FactoryAction(QuoteActionTypes.FETCH, {});

export const fetchSuccess = (quote: IQuote): IReducerAction<IQuote> =>
  FactoryAction(QuoteActionTypes.FETCH_SUCCESS, quote);

export const fetchError = (): IReducerAction<{}> =>
  FactoryAction(QuoteActionTypes.FETCH_ERROR, {});
