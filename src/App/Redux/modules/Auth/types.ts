export type IAuthState = {
  readonly user: IUser;
  readonly isLoading: boolean;
  readonly userIsAuthenticate: boolean;
  readonly access_token: string;
};

export type responseApi = {
  access_token: string;
  token_type: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type ISignin = {
  username: string;
  password: string;
  provider: string;
};

export const AuthActionTypes = {
  FETCH: '@@user/FETCH_AUTH',
  FETCH_SUCCESS: '@@user/FETCH_SUCCESS',
  FETCH_ERROR: '@@user/FETCH_ERROR',
};
