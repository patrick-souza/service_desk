export type IBlockCardState = {
  readonly isLoading: boolean;
  readonly openDialog: boolean;
  readonly cardCode: string;
  readonly historic: IHistoricBlock[];
  readonly historicLoading: boolean;
};

export type IBlockCard = { reason: number; description: string };

export type IHistoricBlock = {
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

export const BlockCardActionTypes = {
  POST: '@@blockCard/POST_BLOCK_CARD',
  POST_SUCCESS: '@@blockCard/POST_BLOCK_CARD_SUCCESS',
  BLOCK_CARD_ERROR: '@@blockCard/BLOCK_CARD_ERROR',
  SHOW_DIALOG: '@@blockCard/SHOW_DIALOG',
  HIDE_DIALOG: '@@blockCard/HIDE_DIALOG',
  FETCH_HISTORIC: '@@blockCard/FETCH_HISTORIC',
  FETCH_HISTORIC_SUCCESS: '@@blockCard/FETCH_HISTORIC_SUCCESS',
};
