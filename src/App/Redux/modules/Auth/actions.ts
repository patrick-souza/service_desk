import FactoryAction from 'App/Util/FactoryAction';
import { IReducerAction } from '..';
import { ISignin, AuthActionTypes, IUser } from '.';

export const fetchAuth = (
  username: string,
  password: string,
  provider = 'HUB'
): IReducerAction<ISignin> =>
  FactoryAction(AuthActionTypes.FETCH, { username, password, provider });

export const fetchAuthSuccess = (
  user: IUser,
  access_token: string
): IReducerAction<{ user: IUser; access_token: string }> =>
  FactoryAction(AuthActionTypes.FETCH_SUCCESS, { user, access_token });

export const fetchAuthError = (): IReducerAction<{}> =>
  FactoryAction(AuthActionTypes.FETCH_ERROR, {});
