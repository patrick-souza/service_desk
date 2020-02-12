import {
  ExtractActionTypes,
  Pagination,
  IExtractPagination,
  FilterPerDate,
} from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchExtract = (
  params: Pagination & FilterPerDate
): IReducerAction<Pagination & FilterPerDate> =>
  FactoryAction(ExtractActionTypes.FETCH, params);

export const fetchExtractSuccess = (
  data: IExtractPagination
): IReducerAction<IExtractPagination> =>
  FactoryAction(ExtractActionTypes.FETCH_SUCCESS, data);

export const fetchExtractError = (): IReducerAction<{}> =>
  FactoryAction(ExtractActionTypes.FETCH_ERROR);

export const updateCardCode = (
  cardCode: number
): IReducerAction<{ cardCode: number }> =>
  FactoryAction(ExtractActionTypes.UPDATE_CARD_CODE, { cardCode });
