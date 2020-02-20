export type IReissueState = {
  readonly isLoading: boolean;
  readonly openDialog: boolean;
  readonly cardCode: string;
  readonly historic: IHistoricReissueCard[];
  readonly historicLoading: boolean;
};

export type IReissueCard = {
  channel: string;
  reason: string;
  card_id: number;
  truncated_number: string;
  cardholder_name: string;
  receiver: string;
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    zipcode: string;
    city: string;
    state: string;
  };
};

export type IHistoricReissueCard = {
  _id: string;
  user: string;
  cardId: number;
  payload: {
    reason: number;
  };
  createdAt: string;
  formatted_createdAt: string;
  updatedAt: string;
};

export const ReissueActionTypes = {
  POST: '@@reissue/POST',
  POST_SUCCESS: '@@reissue/POST_SUCCCESS',
  REISSUE_ERROR: '@@reissue/REISSUE_ERROR',
  SHOW_DIALOG: '@@reissue/SHOW_DIALOG',
  HIDE_DIALOG: '@@reissue/HIDE_DIALOG',
  FETCH_HISTORIC: '@@reissue/FETCH_HISTORIC',
  FETCH_HISTORIC_SUCCESS: '@@reissue/FETCH_HISTORIC_SUCCESS',
};
