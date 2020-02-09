import { IReducerAction } from '..';
import {
  ICardState,
  ICard,
  CardsActionTypes,
  ICardsPagination,
  IStatusCard,
  Characteristics,
} from './types';
import produce from 'immer';

export const initialState: ICardState = {
  cards: [],
  isLoading: false,
  active: 0,
  blocked: 0,
  canceled: 0,
  total: 0,
  count: 0,
  pre_block: 0,
  openDialog: false,
  characteristics: [],
  loadingCharacteristics: false,
};
export const cardsReducer = (
  state = initialState,
  action: IReducerAction<
    | ICardsPagination
    | number
    | { cardCode: number; newState: IStatusCard }
    | Characteristics[]
  >
): ICardState => {
  switch (action.type) {
    case CardsActionTypes.FETCH_CARDS: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case CardsActionTypes.FETCH_CARDS_SUCCESS: {
      return produce(state, draft => {
        const payload = action.payload as ICardsPagination;

        draft.isLoading = false;
        draft.cards = payload.rows;
        draft.active = payload.active;
        draft.blocked = payload.blocked;
        draft.canceled = payload.canceled;
        draft.total = payload.total;
        draft.count = payload.count;
        draft.pre_block = payload.initial_block;
      });
    }
    case CardsActionTypes.CARDS_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case CardsActionTypes.SHOW_DIALOG_CHARACTERISTICS: {
      return produce(state, draft => {
        draft.loadingCharacteristics = true;
        draft.openDialog = true;
      });
    }
    case CardsActionTypes.LOAD_CHARACTERISTICS_SUCCESS: {
      return produce(state, draft => {
        draft.characteristics = action.payload as Characteristics[];
        draft.loadingCharacteristics = false;
      });
    }
    case CardsActionTypes.HIDE_DIALOG_CHARACTERISTICS: {
      return produce(state, draft => {
        draft.openDialog = false;
        draft.characteristics = [];
      });
    }
    case CardsActionTypes.UPDATE_CARD_STATUS: {
      return produce(state, draft => {
        const { cardCode, newState } = action.payload as {
          cardCode: number;
          newState: IStatusCard;
        };

        const card = draft.cards.find(card => card.card_code === cardCode);

        if (card) card.status = newState;
      });
    }
    default:
      return state;
  }
};
