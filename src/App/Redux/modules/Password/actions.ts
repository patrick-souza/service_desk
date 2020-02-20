import {
  HistoricResendPasswordActionTypes,
  IHistoricResendPassword,
} from './types';
import { IReducerAction } from './../index';
import FactoryAction from 'App/Util/FactoryAction';

export const postResendPassword = (
  type: string,
  recipient: string
): IReducerAction<{ type: string; recipient: string }> =>
  FactoryAction(HistoricResendPasswordActionTypes.POST, { type, recipient });

export const postResendPasswordSuccess = (): IReducerAction<{}> =>
  FactoryAction(HistoricResendPasswordActionTypes.POST_SUCCESS, {});

export const showDialogResendPassword = (
  cardCode: string
): IReducerAction<string> =>
  FactoryAction(HistoricResendPasswordActionTypes.SHOW_DIALOG, cardCode);

export const hideDialogResendPassword = (): IReducerAction<{}> =>
  FactoryAction(HistoricResendPasswordActionTypes.HIDE_DIALOG, {});

export const fetchHistoric = (): IReducerAction<{}> =>
  FactoryAction(HistoricResendPasswordActionTypes.FETCH_HISTORIC, {});

export const fetchHistoricSuccess = (
  history: IHistoricResendPassword[]
): IReducerAction<IHistoricResendPassword[]> =>
  FactoryAction(
    HistoricResendPasswordActionTypes.FETCH_HISTORIC_SUCCESS,
    history
  );

export const resendPasswordError = (): IReducerAction<{}> =>
  FactoryAction(HistoricResendPasswordActionTypes.PASSWORD_ERROR, {});
