import { IReducerAction } from '..';
import { BlockCardActionTypes, IBlockCardState, IHistoricBlock } from './types';
import produce from 'immer';

export const initialState: IBlockCardState = {
  isLoading: false,
  openDialog: false,
  cardCode: 0,
  historic: [],
  historicLoading: false,
};
export const blockCardReducer = (
  state = initialState,
  action: IReducerAction<number | IHistoricBlock[]>
): IBlockCardState => {
  switch (action.type) {
    case BlockCardActionTypes.POST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case BlockCardActionTypes.POST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case BlockCardActionTypes.BLOCK_CARD_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.historicLoading = false;
      });
    }
    case BlockCardActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.cardCode = action.payload as number;
      });
    }
    case BlockCardActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
      });
    }
    case BlockCardActionTypes.FETCH_HISTORIC: {
      return produce(state, draft => {
        draft.historicLoading = true;
      });
    }
    case BlockCardActionTypes.FETCH_HISTORIC_SUCCESS: {
      return produce(state, draft => {
        draft.historicLoading = false;
        draft.historic = [...(action.payload as IHistoricBlock[])];
      });
    }
    default:
      return state;
  }
};
