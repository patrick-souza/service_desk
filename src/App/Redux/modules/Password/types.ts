export type IHistoricResendPasswordState = {
  readonly isLoading: boolean;
  readonly openDialog: boolean;
  readonly cardCode: string;
  readonly historic: IHistoricResendPassword[];
  readonly historicLoading: boolean;
};

export type IHistoricResendPassword = {
  _id: string;
  cardId: number;
  recipient: string;
  type: string;
  createdAt: string;
  formatedDate: string;
};

export const HistoricResendPasswordActionTypes = {
  POST: '@@password/POST',
  POST_SUCCESS: '@@password/POST_SUCCCESS',
  PASSWORD_ERROR: '@@password/PASSWORD_ERROR',
  SHOW_DIALOG: '@@password/SHOW_DIALOG',
  HIDE_DIALOG: '@@password/HIDE_DIALOG',
  FETCH_HISTORIC: '@@password/FETCH_HISTORIC',
  FETCH_HISTORIC_SUCCESS: '@@password/FETCH_HISTORIC_SUCCESS',
};
