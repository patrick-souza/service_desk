import produce from 'immer';
import { IReducerAction } from '..';
import { IOrder, IOrderState, OrderActionTypes } from './types';

export const initialState: IOrderState = {
  openDialog: false,
  isLoading: false,
  order: {} as IOrder,
};

export const orderReducer = (
  state: IOrderState = initialState,
  action: IReducerAction<IOrder | number>
): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.order = action.payload as IOrder;
      });
    }
    case OrderActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case OrderActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.isLoading = true;
      });
    }
    case OrderActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
      });
    }
    default:
      return state;
  }
};
