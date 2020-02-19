import { produce } from 'immer';
import { IReducerAction } from '..';
import {
  IReissueState,
  IHistoricReissueCard,
  ReissueActionTypes,
} from './types';

export const initialState: IReissueState = {
  cardCode: 0,
  openDialog: false,
  isLoading: false,
  historic: [],
  historicLoading: false,
};

export const reissueReducer = (
  state = initialState,
  action: IReducerAction<number | IHistoricReissueCard[]>
): IReissueState => {
  switch (action.type) {
    case ReissueActionTypes.POST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case ReissueActionTypes.POST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case ReissueActionTypes.REISSUE_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case ReissueActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.cardCode = action.payload as number;
      });
    }
    case ReissueActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
        draft.cardCode = 0;
      });
    }
    case ReissueActionTypes.FETCH_HISTORIC: {
      return produce(state, draft => {
        draft.historicLoading = true;
      });
    }
    case ReissueActionTypes.FETCH_HISTORIC_SUCCESS: {
      return produce(state, draft => {
        draft.historicLoading = false;
        draft.historic = [...(action.payload as IHistoricReissueCard[])];
      });
    }
    default:
      return state;
  }
};
