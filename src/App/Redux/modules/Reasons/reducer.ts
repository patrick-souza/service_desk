import { IReducerAction } from '..';
import { IReason, IReasonState, ReasonActionTypes } from './types';
import produce from 'immer';

export const initialState: IReasonState = {
  reasons: [],
  isLoading: false,
};
export const reasonReducer = (
  state = initialState,
  action: IReducerAction<IReason[] | string>
): IReasonState => {
  switch (action.type) {
    case ReasonActionTypes.FETCH_REASON: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case ReasonActionTypes.FETCH_REASON_SUCCESS: {
      return produce(state, draft => {
        draft.reasons = action.payload as IReason[];
        draft.isLoading = false;
      });
    }
    case ReasonActionTypes.FETCH_REASON_ERROR: {
      return produce(state, draft => {
        draft.reasons = [];
        draft.isLoading = false;
      });
    }
    default:
      return state;
  }
};
