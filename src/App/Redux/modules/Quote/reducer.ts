import { IReducerAction } from '..';
import produce from 'immer';
import { IQuote, IQuoteState, QuoteActionTypes } from './types';

export const initialState: IQuoteState = {
  isLoading: false,
  author: '',
  quote: '',
};

export const quoteReducer = (
  state: IQuoteState = initialState,
  action: IReducerAction<IQuote>
): IQuoteState => {
  switch (action.type) {
    case QuoteActionTypes.FETCH: {
      return produce(initialState, draft => {
        draft.isLoading = true;
      });
    }
    case QuoteActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.payload) {
          const { quote, author } = action.payload;
          draft.quote = quote;
          draft.author = author;
        }
      });
    }
    case QuoteActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.author = '';
        draft.quote = '';
      });
    }
    default:
      return state;
  }
};
