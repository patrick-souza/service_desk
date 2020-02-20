import { IReducerAction } from '..';
import {
  ICardState,
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
  activeFilter: 'T',
  loadingContactless: '',
};
export const cardsReducer = (
  state = initialState,
  action: IReducerAction<
    | ICardsPagination
    | string
    | { cardCode: string; newState: IStatusCard }
    | Characteristics[]
    | IStatusCard
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
          cardCode: string;
          newState: IStatusCard;
        };

        const card = draft.cards.find(card => card.card_code === cardCode);

        if (card) card.status = newState;
      });
    }
    case CardsActionTypes.TOGGLE_ACTIVE_FILTER: {
      return produce(state, draft => {
        draft.activeFilter = action.payload as IStatusCard;
        draft.isLoading = true;
      });
    }
    case CardsActionTypes.TOGGLE_CONTACTLESS: {
      return produce(state, draft => {
        draft.loadingContactless = action.payload as string;
      });
    }

    case CardsActionTypes.UPDATE_CARD_CONTACTLESS: {
      return produce(state, draft => {
        const card = draft.cards.find(
          card => card.card_code === action.payload
        );
        if (card && card.contactless) {
          card.contactless.status = !card.contactless.status;
          draft.loadingContactless = '';
        }
      });
    }
    default:
      return state;
  }
};
