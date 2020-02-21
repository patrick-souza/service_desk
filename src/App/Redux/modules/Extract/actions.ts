import FactoryAction from 'App/Util/FactoryAction';
import {
  ExtractActionTypes,
  Pagination,
  IExtractPagination,
  FilterPerDate,
} from './types';
import { IReducerAction } from '..';

export const fetchExtract = (params: Pagination): IReducerAction<Pagination> =>
  FactoryAction(ExtractActionTypes.FETCH, params);

export const fetchExtractSuccess = (
  data: IExtractPagination
): IReducerAction<IExtractPagination> =>
  FactoryAction(ExtractActionTypes.FETCH_SUCCESS, data);

export const fetchExtractError = (): IReducerAction<{}> =>
  FactoryAction(ExtractActionTypes.FETCH_ERROR);

export const updateFilterExtract = (
  dates: FilterPerDate
): IReducerAction<FilterPerDate> =>
  FactoryAction(ExtractActionTypes.SET_ACTIVE_FILTER, dates);

export const resetFilterExtract = () =>
  FactoryAction(ExtractActionTypes.RESET_FILTER);
