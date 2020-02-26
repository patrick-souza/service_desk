import FactoryAction from 'App/Util/FactoryAction';
import { IBearer, BearerActionTypes } from './types';
import { IReducerAction } from '..';

export const fetchBearer = (cardholderId: string): IReducerAction<string> =>
  FactoryAction(BearerActionTypes.FETCH, cardholderId);

export const fetchSuccess = (bearer: IBearer): IReducerAction<IBearer> =>
  FactoryAction(BearerActionTypes.FETCH_SUCCESS, { ...bearer });

export const fetchError = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.FETCH_ERROR, {});

export const showEditDialog = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.SHOW_DIALOG, {});

export const hideEditDialog = (): IReducerAction<{}> =>
  FactoryAction(BearerActionTypes.HIDE_DIALOG, {});
