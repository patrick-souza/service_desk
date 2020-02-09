export type IBearerState = {
  readonly bearer: IBearer;
  readonly edit: boolean;
  readonly isLoading: boolean;
};

export type IBearer = {
  document: string;
  formatted_document: string;
  name: string;
  born: string;
  formatted_born: string;
  phone: string;
  formatted_phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  tier: string;
  type: string;
};

export const BearerActionTypes = {
  FETCH: '@@bearer/FETCH',
  FETCH_SUCCESS: '@@bearer/FETCH_SUCCESS',
  FETCH_ERROR: '@@bearer/FETCH_ERROR',
  SHOW_DIALOG: '@@bearer/SHOW_DIALOG',
  HIDE_DIALOG: '@@bearer/HIDE_DIALOG',
};
