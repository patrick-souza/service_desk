import FactoryAction from 'App/Util/FactoryAction';
import { ReasonActionTypes, IReason, ReasonsGroups } from './types';
import { IReducerAction } from '..';

export const fetchReasons = (
  type: ReasonsGroups
): IReducerAction<ReasonsGroups> =>
  FactoryAction(ReasonActionTypes.FETCH_REASON, type);

export const fetchReasonsSuccess = (
  reasons: IReason[]
): IReducerAction<IReason[]> =>
  FactoryAction(ReasonActionTypes.FETCH_REASON_SUCCESS, reasons);

export const fetchReasonsError = (): IReducerAction<{}> =>
  FactoryAction(ReasonActionTypes.FETCH_REASON_ERROR, {});
