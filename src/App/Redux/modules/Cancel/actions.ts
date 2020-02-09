import { IReducerAction } from '..';
import { CancelCardActionTypes, IHistoricCancel } from './types';
import FactoryAction from 'App/Util/FactoryAction';

export const PostCancelCard = (
  reason: number,
  description: string
): IReducerAction<{ reason: number; description: string }> =>
  FactoryAction(CancelCardActionTypes.POST, { reason, description });

export const PostCancelCardSuccess = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.POST_SUCCESS, {});

export const cancelCardError = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.CANCEL_CARD_ERROR, {});

export const ShowDialogCancelCard = (
  cardCode: number
): IReducerAction<number> =>
  FactoryAction(CancelCardActionTypes.SHOW_DIALOG, cardCode);

export const HideDialogCancelCard = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.HIDE_DIALOG, {});

export const fetchHistoric = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.FETCH_HISTORIC, {});

export const fetchHistoricSuccess = (
  historic: IHistoricCancel[]
): IReducerAction<any> =>
  FactoryAction(CancelCardActionTypes.FETCH_HISTORIC_SUCCESS, historic);
