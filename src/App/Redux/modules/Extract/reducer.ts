import produce from 'immer';
import { IReducerAction } from '..';
import {
  IExtractState,
  ExtractActionTypes,
  IExtractPagination,
  Pagination,
  FilterPerDate,
} from './types';

export const initialState: IExtractState = {
  transactions: [],
  isLoading: false,
  transationTotal: 0,
  cardCode: '',
  filter: [],
};

export const extractReducer = (
  state: IExtractState = initialState,
  {
    payload,
    type,
  }: IReducerAction<IExtractPagination | Pagination | FilterPerDate>
): IExtractState => {
  switch (type) {
    case ExtractActionTypes.FETCH: {
      return produce(state, draft => {
        draft.isLoading = true;
        const { cardCode } = payload as Pagination;

        if (cardCode) draft.cardCode = cardCode;
      });
    }
    case ExtractActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        const { rows, count } = payload as IExtractPagination;
        draft.transactions = rows;
        draft.transationTotal = count;
        draft.isLoading = false;
      });
    }
    case ExtractActionTypes.FETCH_ERROR: {
      return produce(initialState, draft => {
        draft.isLoading = false;
      });
    }
    case ExtractActionTypes.SET_ACTIVE_FILTER: {
      return produce(state, draft => {
        draft.isLoading = true;

        const [startDate, endDate] = payload as FilterPerDate;
        if (startDate && endDate)
          draft.filter = [startDate, endDate.add(1, 'days')];
      });
    }
    case ExtractActionTypes.RESET_FILTER: {
      return produce(state, draft => {
        draft.filter = [];
        draft.isLoading = true;
      });
    }
    default:
      return state;
  }
};
