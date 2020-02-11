import { IReducerAction } from '..';
import { ISearchState, SearchActionTypes, IResultSearch } from './types';
import produce from 'immer';

export const initialState: ISearchState = {
  result: [],
  isLoading: false,
  openDialog: false,
};
export const searchReducer = (
  state = initialState,
  action: IReducerAction<IResultSearch[] | string>
): ISearchState => {
  switch (action.type) {
    case SearchActionTypes.SHOW_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.result = [];
      });
    }
    case SearchActionTypes.HIDE_DIALOG: {
      return produce(state, draft => {
        draft.openDialog = false;
      });
    }
    case SearchActionTypes.FETCH: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case SearchActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.result = action.payload as IResultSearch[];
      });
    }
    case SearchActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.openDialog = true;
        draft.isLoading = false;
        draft.result = [];
      });
    }
    case SearchActionTypes.RESET: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.result = [];
      });
    }
    default:
      return state;
  }
};
