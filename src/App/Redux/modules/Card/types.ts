export type ICardState = {
  readonly cards: ICard[];
  readonly isLoading: boolean;
  readonly active: number;
  readonly pre_block: number;
  readonly blocked: number;
  readonly canceled: number;
  readonly total: number;
  readonly count: number;
  readonly openDialog: boolean;
  readonly characteristics: Characteristics[];
  readonly loadingCharacteristics: boolean;
};

export type ICard = {
  cardholder_id: number;
  card_code: number;
  card_name: string;
  expiration_date: Date;
  formatted_expiration_date: string;
  image: string;
  truncate_number: string;
  balance: number;
  formatted_balance: string;
  status: IStatusCard;
  document: string;
  documentType: 'CPF' | 'CNPJ';
  formatted_document: string;
  card_specifications: Specification;
  cashback: number;
  formatted_cashback: string;
  tier: Tier;
};

export type Specification = {
  summary: string;
  characteristics: Characteristics[];
};

export type ICardsPagination = {
  rows: ICard[];
  total: number;
  count: number;
  active: number;
  initial_block: number;
  blocked: number;
  canceled: number;
};

export type Characteristics = {
  name: string;
  identificator: string;
  value: string | boolean;
  formatted_value: string | boolean;
  type: 'Numeric' | 'Boolean' | 'Monetary' | 'String';
};

type Tier = 'partner' | 'gold' | 'diamond' | 'platinum';

export type Pagination = {
  rowsPerPage?: number;
  page?: number;
  cardCodes?: number[];
};

export type FilterByState = {
  state: IStatusCard;
};

export type IStatusCard = 'T' | 'A' | 'B' | 'P' | 'C';

export const CardsActionTypes = {
  FETCH_CARDS: '@@cards/FETCH_CARDS',
  FETCH_CARDS_SUCCESS: '@@cards/FETCH_CARDS_SUCCESS',
  CARDS_ERROR: '@@cards/CARDS_ERROR',
  SHOW_DIALOG_CHARACTERISTICS: '@@cards/SHOW_DIALOG_CHARACTERISTICS',
  HIDE_DIALOG_CHARACTERISTICS: '@@cards/HIDE_DIALOG_CHARACTERISTICS',
  LOAD_CHARACTERISTICS_SUCCESS: '@@cards/LOAD_CHARACTERISTICS_SUCCESS',
  UPDATE_CARD_STATUS: '@@cards/UPDATE_CARD_STATUS',
};
