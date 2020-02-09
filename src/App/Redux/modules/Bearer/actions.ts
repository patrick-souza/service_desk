import { IBearer, BearerActionTypes } from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchBearer = (cardholderId: number): IReducerAction<number> =>
  FactoryAction(BearerActionTypes.FETCH, cardholderId);

export const fetchSuccess = (bearer: IBearer): IReducerAction<IBearer> =>
  FactoryAction(BearerActionTypes.FETCH_SUCCESS, { ...bearer });

export const fetchError = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.FETCH_ERROR, {});

export const showEditDialog = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.SHOW_DIALOG, {});

export const hideEditDialog = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.HIDE_DIALOG, {});
