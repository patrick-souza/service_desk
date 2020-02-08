export type IQuoteState = {
  readonly quote: string;
  readonly author: string;
  readonly isLoading: boolean;
};

export type IQuote = {
  quote: string;
  author: string;
};

export const QuoteActionTypes = {
  FETCH: '@@quote/FETCH_QUOTE',
  FETCH_SUCCESS: '@@quote/FETCH_QUOTE_SUCCESS',
  FETCH_ERROR: '@@quote/FETCH_QUOTE_ERROR',
};
