import moment from 'moment';

export type IExtractState = {
  readonly transactions: IExtract[];
  readonly transationTotal: number;
  readonly cardCode: string;
  readonly isLoading: boolean;
  readonly filter: moment.Moment[];
};

export type IExtract = {
  trasactionCode: number;
  cardCode: number;
  establishment: string;
  establishmentCode: number;
  authorizationDate: string;
  formatted_authorizationDate: string;
  situationCode: number;
  typeSituationCode: number;
  value: number;
  formatted_value: string;
  acquirerCode: number;
  settlementDate: string;
  registrationDate: string;
  formatted_registrationDate: string;
  typeTransaction: {
    typeTransactionCode: number;
    name: string;
  };
  situationTransaction: {
    situationCode: number;
    name: string;
  };
};
export type IExtractPagination = {
  rows: IExtract[];
  count: number;
};

export type Pagination = {
  page?: number;
  cardCode?: string;
};

export type FilterPerDate = moment.Moment[];

export const ExtractActionTypes = {
  FETCH: '@@extract/FETCH_EXTRACT',
  FETCH_SUCCESS: '@@extract/FETCH_SUCCESS_EXTRACT',
  FETCH_ERROR: '@@extract/FETCH_ERROR',
  SET_ACTIVE_FILTER: '@@extract/SET_ACTIVE_FILTER',
  RESET_FILTER: '@@extract/RESET_FILTER',
};
