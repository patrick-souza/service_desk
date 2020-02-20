import { IReducerAction } from '..';
import {
  CancelCardActionTypes,
  ICancelCardState,
  IHistoricCancel,
} from './types';
import produce from 'immer';

export const initialState: ICancelCardState = {
  isLoading: false,
  openDialog: false,
  cardCode: '',
  historic: [],
  historicLoading: false,
};
export const cancelCardReducer = (
  state = initialState,
  action: IReducerAction<string | IHistoricCancel[]>
): ICancelCardState => {
  switch (action.type) {
    case CancelCardActionTypes.POST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case CancelCardActionTypes.POST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case CancelCardActionTypes.CANCEL_CARD_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.historicLoading = false;
      });
    }
    case CancelCardActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.cardCode = action.payload as string;
      });
    }
    case CancelCardActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
      });
    }
    case CancelCardActionTypes.FETCH_HISTORIC: {
      return produce(state, draft => {
        draft.historicLoading = true;
      });
    }
    case CancelCardActionTypes.FETCH_HISTORIC_SUCCESS: {
      return produce(state, draft => {
        draft.historicLoading = false;
        draft.historic = [...(action.payload as IHistoricCancel[])];
      });
    }
    default:
      return state;
  }
};
