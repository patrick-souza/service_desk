import { IReducerAction } from '..';
import { SearchActionTypes, IResultSearch, ITypeOfSearch } from './types';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchDataBearer = (
  typeOfSearch: ITypeOfSearch,
  termOfSearch: string
): IReducerAction<{ typeOfSearch: ITypeOfSearch; termOfSearch: string }> =>
  FactoryAction(SearchActionTypes.FETCH, { typeOfSearch, termOfSearch });

export const dataSuccess = (
  data: IResultSearch[]
): IReducerAction<IResultSearch[]> =>
  FactoryAction(SearchActionTypes.FETCH_SUCCESS, data);

export const SearchError = (): IReducerAction<{}> =>
  FactoryAction(SearchActionTypes.FETCH_ERROR, {});

export const showDialog = (): IReducerAction<{}> =>
  FactoryAction(SearchActionTypes.SHOW_DIALOG, {});

export const hideDialog = (): IReducerAction<{}> =>
  FactoryAction(SearchActionTypes.HIDE_DIALOG, {});

export const selectCard = (card_code: number): IReducerAction<number> =>
  FactoryAction(SearchActionTypes.SELECT_CARD, card_code);
