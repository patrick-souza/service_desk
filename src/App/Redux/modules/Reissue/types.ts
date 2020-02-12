export type IReissueState = {
  readonly isLoading: boolean;
  readonly openDialog: boolean;
  readonly cardId: number;
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
    cardId: number;
    reasonId: number;
    user: string;
    delivery: {
      content: {
        recipient: IRecipient;
        sender: ISender;
      };
    };
    embossing: IEmbossing;
  };
};

type IEmbossing = {
  content: {
    plastic: {
      holder: string;
      message: string;
      imageId: string;
      image: string;
    };
    letter: {
      color: string;
      title: string;
      message: string;
      signature: string;
    };
  };
};

type ISender = {
  name: string;
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

type IRecipient = {
  name: string;
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

export const ReissueActionTypes = {
  POST: '@@reissue/POST',
  POST_SUCCESS: '@@reissue/POST_SUCCCESS',
  REISSUE_ERROR: '@@reissue/REISSUE_ERROR',
  SHOW_DIALOG: '@@reissue/SHOW_DIALOG',
  HIDE_DIALOG: '@@reissue/HIDE_DIALOG',
  FETCH_HISTORIC: '@@reissue/FETCH_HISTORIC',
  FETCH_HISTORIC_SUCCESS: '@@reissue/FETCH_HISTORIC_SUCCESS',
};
