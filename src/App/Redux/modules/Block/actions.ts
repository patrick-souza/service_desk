import { IReducerAction } from '..';
import { BlockCardActionTypes, IHistoricBlock, IBlockCard } from './types';
import FactoryAction from 'App/Util/FactoryAction';

export const PostBlockCard = (
  reason: number,
  description: string
): IReducerAction<IBlockCard> =>
  FactoryAction(BlockCardActionTypes.POST, { reason, description });

export const postBlockCardSuccess = (): IReducerAction<{}> =>
  FactoryAction(BlockCardActionTypes.POST_SUCCESS, {});

export const blockCardError = (): IReducerAction<{}> =>
  FactoryAction(BlockCardActionTypes.BLOCK_CARD_ERROR, {});

export const showDialogBlockCard = (cardCode: number): IReducerAction<number> =>
  FactoryAction(BlockCardActionTypes.SHOW_DIALOG, cardCode);

export const hideDialogBlockCard = (): IReducerAction<{}> =>
  FactoryAction(BlockCardActionTypes.HIDE_DIALOG, {});

export const fetchHistoric = (): IReducerAction<{}> =>
  FactoryAction(BlockCardActionTypes.FETCH_HISTORIC, {});

export const fetchHistoricSuccess = (
  history: IHistoricBlock[]
): IReducerAction<IHistoricBlock[]> =>
  FactoryAction(BlockCardActionTypes.FETCH_HISTORIC_SUCCESS, history);
