import {
  ReissueActionTypes,
  IReissueCard,
  IHistoricReissueCard,
} from './types';
import { IReducerAction } from './../index';
import FactoryAction from 'App/Util/FactoryAction';

export const postReissueCard = (card: IReissueCard): IReducerAction<{}> =>
  FactoryAction(ReissueActionTypes.POST, card);

export const postReissueCardSuccess = (): IReducerAction<{}> =>
  FactoryAction(ReissueActionTypes.POST_SUCCESS);

export const showDialogReissueCard = (
  cardCode: number
): IReducerAction<number> =>
  FactoryAction(ReissueActionTypes.SHOW_DIALOG, cardCode);

export const hideDialogReissueCard = (): IReducerAction<{}> =>
  FactoryAction(ReissueActionTypes.HIDE_DIALOG);

export const fetchHistoric = (): IReducerAction<{}> =>
  FactoryAction(ReissueActionTypes.FETCH_HISTORIC);

export const fetchHistoricSuccess = (
  history: IHistoricReissueCard[]
): IReducerAction<IHistoricReissueCard[]> =>
  FactoryAction(ReissueActionTypes.FETCH_HISTORIC_SUCCESS, history);

export const reissueCardError = (): IReducerAction<{}> =>
  FactoryAction(ReissueActionTypes.REISSUE_ERROR);
