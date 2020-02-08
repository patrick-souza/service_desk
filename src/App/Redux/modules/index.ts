import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { authReducer, IAuthState, authSaga } from './Auth';

export type IApplicationState = {
  auth: IAuthState;
};

export type IReducerAction<T> = { type: string; payload?: T };

const reducers = combineReducers({
  auth: authReducer,
});

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default { reducers, rootSaga };
