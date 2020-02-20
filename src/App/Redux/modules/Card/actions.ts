import { IReducerAction } from '..';
import {
  CardsActionTypes,
  ICardsPagination,
  Pagination,
  IStatusCard,
  Characteristics,
} from './types';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchCards = (params: Pagination): IReducerAction<Pagination> =>
  FactoryAction(CardsActionTypes.FETCH_CARDS, params);

export const fetchCardsSuccess = (
  cards: ICardsPagination
): IReducerAction<ICardsPagination> =>
  FactoryAction(CardsActionTypes.FETCH_CARDS_SUCCESS, cards);

export const cardsError = (): IReducerAction<{}> =>
  FactoryAction(CardsActionTypes.CARDS_ERROR, {});

export const showDialogCharacteristics = (
  cardCode: number
): IReducerAction<number> =>
  FactoryAction(CardsActionTypes.SHOW_DIALOG_CHARACTERISTICS, cardCode);

export const hideDialogCharacteristics = (): IReducerAction<{}> =>
  FactoryAction(CardsActionTypes.HIDE_DIALOG_CHARACTERISTICS, {});

export const loadCharacteristics = (
  characteristics: Characteristics[]
): IReducerAction<Characteristics[]> =>
  FactoryAction(CardsActionTypes.LOAD_CHARACTERISTICS_SUCCESS, characteristics);

export const updateStateCard = (
  cardCode: string,
  newState: IStatusCard
): IReducerAction<{ cardCode: string; newState: IStatusCard }> =>
  FactoryAction(CardsActionTypes.UPDATE_CARD_STATUS, { cardCode, newState });

export const setActiveFilter = (
  status: IStatusCard
): IReducerAction<IStatusCard> =>
  FactoryAction(CardsActionTypes.TOGGLE_ACTIVE_FILTER, status);
export const toggleContactless = (cardCode: string): IReducerAction<string> =>
  FactoryAction(CardsActionTypes.TOGGLE_CONTACTLESS, cardCode);

export const updateCardContactless = (
  cardCode: string
): IReducerAction<string> =>
  FactoryAction(CardsActionTypes.UPDATE_CARD_CONTACTLESS, cardCode);
