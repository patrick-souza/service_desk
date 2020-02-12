import { IReducerAction } from '..';
import produce from 'immer';
import { IExtractState, ExtractActionTypes, IExtractPagination } from './types';

export const initialState: IExtractState = {
  transactions: [],
  isLoading: false,
  transationTotal: 0,
  cardCode: 0,
};

export const extractReducer = (
  state: IExtractState = initialState,
  action: IReducerAction<IExtractPagination | { cardCode: number }>
): IExtractState => {
  switch (action.type) {
    case ExtractActionTypes.FETCH: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case ExtractActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        const payload = action.payload as IExtractPagination;
        draft.transactions = payload.rows;
        draft.transationTotal = payload.count;
        draft.isLoading = false;
      });
    }
    case ExtractActionTypes.UPDATE_CARD_CODE: {
      return produce(state, draft => {
        draft.isLoading = true;
        const { cardCode } = action.payload as { cardCode: number };
        draft.cardCode = cardCode;
      });
    }
    case ExtractActionTypes.FETCH_ERROR: {
      return produce(initialState, draft => {
        draft.isLoading = false;
      });
    }
    default:
      return state;
  }
};
