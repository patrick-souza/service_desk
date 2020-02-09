import { ReasonActionTypes, IReason, ReasonsGroups } from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

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
