import { produce } from 'immer';
import { IReducerAction } from '..';
import {
  IHistoricResendPasswordState,
  HistoricResendPasswordActionTypes,
  IHistoricResendPassword,
} from './types';

export const initialState: IHistoricResendPasswordState = {
  cardCode: '',
  openDialog: false,
  isLoading: false,
  historic: [],
  historicLoading: false,
};

export const historicResendPasswordReducer = (
  state = initialState,
  action: IReducerAction<string | IHistoricResendPassword[]>
): IHistoricResendPasswordState => {
  switch (action.type) {
    case HistoricResendPasswordActionTypes.POST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case HistoricResendPasswordActionTypes.POST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.historic = action.payload as IHistoricResendPassword[];
      });
    }
    case HistoricResendPasswordActionTypes.FETCH_HISTORIC: {
      return produce(state, draft => {
        draft.historicLoading = true;
      });
    }
    case HistoricResendPasswordActionTypes.FETCH_HISTORIC_SUCCESS: {
      return produce(state, draft => {
        draft.historicLoading = false;
        draft.historic = action.payload as IHistoricResendPassword[];
      });
    }
    case HistoricResendPasswordActionTypes.PASSWORD_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.historicLoading = false;
      });
    }
    case HistoricResendPasswordActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.cardCode = action.payload as string;
      });
    }
    case HistoricResendPasswordActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
      });
    }
    default:
      return state;
  }
};
