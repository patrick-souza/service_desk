import produce from 'immer';
import { IAuthState, IUser, AuthActionTypes, ISignin } from './types';
import { IReducerAction } from '..';

export const initialState: IAuthState = {
  user: {} as IUser,
  isLoading: false,
  userIsAuthenticate: false,
  access_token: '',
};

export const authReducer = (
  state: IAuthState = initialState,
  action: IReducerAction<
    { user: IUser; access_token: string } | string | ISignin
  >
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.FETCH: {
      return produce(initialState, draft => {
        draft.isLoading = true;
      });
    }
    case AuthActionTypes.FETCH_SUCCESS: {
      return produce(initialState, draft => {
        const { user, access_token } = action.payload as {
          user: IUser;
          access_token: string;
        };
        draft.user = user;
        draft.userIsAuthenticate = true;
        draft.access_token = access_token;
      });
    }
    case AuthActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.userIsAuthenticate = false;
      });
    }
    default:
      return state;
  }
};
