import { IOrder, OrderActionTypes } from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchOrderSuccess = (order: IOrder): IReducerAction<{}> =>
  FactoryAction(OrderActionTypes.FETCH_SUCCESS, order);

export const fetchOrderError = (): IReducerAction<{}> =>
  FactoryAction(OrderActionTypes.FETCH_ERROR, {});

export const ShowDialogOrderCard = (cardCode: number): IReducerAction<number> =>
  FactoryAction(OrderActionTypes.SHOW_DIALOG, cardCode);

export const HideDialogOrderCard = (): IReducerAction<{}> =>
  FactoryAction(OrderActionTypes.HIDE_DIALOG, {});
