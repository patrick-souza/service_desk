export type ICancelCardState = {
  readonly isLoading: boolean;
  readonly openDialog: boolean;
  readonly cardCode: number;
  readonly historic: IHistoricCancel[];
  readonly historicLoading: boolean;
};

export type ICancelCard = { reason: number; description: string };

export type IHistoricCancel = {
  _id: string;
  user: string;
  cardId: number;
  payload: {
    situacao: {
      codigoSituacao: number;
      nome: string;
      situacao: string;
      identificador: string;
    };
  };
  createdAt: string;
  formatted_createdAt: string;
};

export const CancelCardActionTypes = {
  POST: '@@cancelCard/POST_CANCEL_CARD',
  POST_SUCCESS: '@@cancelCard/POST_CANCEL_CARD_SUCCESS',
  CANCEL_CARD_ERROR: '@@cancelCard/CANCEL_CARD_ERROR',
  SHOW_DIALOG: '@@cancelCard/SHOW_DIALOG',
  HIDE_DIALOG: '@@cancelCard/HIDE_DIALOG',
  FETCH_HISTORIC: '@@cancelCard/FETCH_HISTORIC',
  FETCH_HISTORIC_SUCCESS: '@@cancelCard/FETCH_HISTORIC_SUCCESS',
};
