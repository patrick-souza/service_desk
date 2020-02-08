import { put, all, takeLatest, fork, call } from 'redux-saga/effects';

import API from 'App/Services/Api';
import endpoints from 'Config/endpoints';
import history from 'App/Util/history';
import getUserInToken from 'App/Services/Auth';
import { notification } from 'antd';
import { AuthActionTypes, ISignin, responseApi } from './types';
import { fetchAuthSuccess, fetchAuthError } from './actions';
import { IReducerAction, IApplicationState } from '..';

export function* handleAuth(action: IReducerAction<ISignin>): Generator {
  try {
    notification.destroy();
    const credentials = { ...action.payload };

    const response = (yield call(
      API.post,
      `${endpoints.auth_api}/login`,
      credentials
    )) as responseApi;

    const { access_token } = response;

    const user = getUserInToken(access_token);

    API.defaults.headers.authorization = `bearer ${access_token}`;

    yield put(fetchAuthSuccess(user, access_token));

    history.push('/dashboard');
  } catch (err) {
    // if (err.data.errors)
    // toast.error(err.data.errors.map((e: any) => e.message).join('\br'), {
    //   position: ToastPosition.TOP_LEFT,
    // });
    notification.error({
      message: 'Login e/ou Senha inválidos',
      placement: 'topLeft',
    });
    yield put(fetchAuthError());
  }
}

function persistToken(action: IReducerAction<IApplicationState>): void {
  if (action.payload && action.payload.auth.access_token)
    API.defaults.headers.authorization = `bearer ${action.payload.auth.access_token}`;
}

function* watchFetchRequest(): Generator {
  yield takeLatest(AuthActionTypes.FETCH, handleAuth);
}

export function* authSaga(): Generator {
  yield all([
    fork(watchFetchRequest),
    takeLatest('persist/REHYDRATE', persistToken),
  ]);
}
