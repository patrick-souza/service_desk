import FactoryAction from 'App/Util/FactoryAction';
import { IReducerAction } from '..';
import { CancelCardActionTypes, IHistoricCancel, ICancelCard } from './types';

export const PostCancelCard = (
  reason: number,
  description: string
): IReducerAction<ICancelCard> =>
  FactoryAction(CancelCardActionTypes.POST, { reason, description });

export const PostCancelCardSuccess = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.POST_SUCCESS, {});

export const cancelCardError = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.CANCEL_CARD_ERROR, {});

export const ShowDialogCancelCard = (
  cardCode: string
): IReducerAction<string> =>
  FactoryAction(CancelCardActionTypes.SHOW_DIALOG, cardCode);

export const HideDialogCancelCard = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.HIDE_DIALOG, {});

export const fetchHistoric = (): IReducerAction<{}> =>
  FactoryAction(CancelCardActionTypes.FETCH_HISTORIC, {});

export const fetchHistoricSuccess = (
  historic: IHistoricCancel[]
): IReducerAction<any> =>
  FactoryAction(CancelCardActionTypes.FETCH_HISTORIC_SUCCESS, historic);
