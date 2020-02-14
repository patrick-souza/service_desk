import { produce } from 'immer';
import { IReducerAction } from '..';
import { IReissueState, ReissueActionTypes } from './types';

export const initialState: IReissueState = {
  cardCode: 0,
  openDialog: false,
  isLoading: false,
  historic: [],
  historicLoading: false,
};

export const reissueReducer = (
  state = initialState,
  action: IReducerAction<number>
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
        draft.cardCode = action.payload;
      });
    }
    case ReissueActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
        draft.cardCode = 0;
      });
    }
    default:
      return state;
  }
};
