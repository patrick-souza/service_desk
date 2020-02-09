export type IReasonState = {
  readonly reasons: IReason[];
  readonly isLoading: boolean;
};

export type ApiResponse = { reasons: IReason[] };

export type IReason = {
  codigoSituacao: number;
  situacao: ReasonStatus;
  nome: string;
  identificador: string;
};

type ReasonStatus = 'C' | 'B';

export enum ReasonsGroups {
  CANCEL_CARD = 'CANCEL_CARD',
  BLOCK_CARD = 'BLOCK_CARD',
  REISSUE_CARD = 'REISSUE_CARD',
}

export const ReasonActionTypes = {
  FETCH_REASON: '@@reason/FETCH_REASON',
  FETCH_REASON_SUCCESS: '@@reason/FETCH_REASON_SUCCESS',
  FETCH_REASON_ERROR: '@@reason/FETCH_REASON_ERROR',
};
