import produce from 'immer';
import { IReducerAction } from '..';
import { IBearer, IBearerState, BearerActionTypes } from './types';

export const initialState: IBearerState = {
  bearer: {} as IBearer,
  edit: false,
  isLoading: false,
};
export const bearerReducer = (
  state = initialState,
  action: IReducerAction<IBearer>
): IBearerState => {
  switch (action.type) {
    case BearerActionTypes.FETCH: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case BearerActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.bearer = action.payload as IBearer;
      });
    }
    case BearerActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.bearer = {} as IBearer;
      });
    }
    case BearerActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.edit = true;
      });
    }
    case BearerActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.edit = false;
      });
    }
    default:
      return state;
  }
};
