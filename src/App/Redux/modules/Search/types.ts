export type ISearchState = {
  readonly result: IResultSearch[];
  readonly isLoading: boolean;
  readonly openDialog: boolean;
};

export type IResultSearch = {
  cardholder_id: number;
  card_code: number;
  truncated_number: string;
  image: string;
};

export type ITypeOfSearch =
  | 'CPF'
  | 'CNPJ'
  | 'ACCOUNT_ID'
  | 'ORDER_ID'
  | 'ORDER_ITEM_ID';

export const SearchActionTypes = {
  FETCH: '@@search/FETCH',
  FETCH_SUCCESS: '@@search/FETCH_SUCCESS',
  FETCH_ERROR: '@@search/FETCH_ERROR',
  SHOW_DIALOG: '@@search/SHOW_DIALOG',
  HIDE_DIALOG: '@@search/HIDE_DIALOG',
  SELECT_CARD: '@@search/SELECT_CARD',
  RESET: '@@search/RESET',
};
