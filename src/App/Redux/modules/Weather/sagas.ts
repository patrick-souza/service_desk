import { takeLatest, all, select, call, put } from 'redux-saga/effects';
import { WeatherActionTypes, IWeather } from './types';
import { IApplicationState } from '..';
import { fetchSuccess, fetchError } from './actions';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
export function* handleWeather(): Generator {
  try {
    const userId = yield select(({ auth }: IApplicationState) => {
      let userId = '0';
      if (auth.user) {
        userId = auth.user.id;
      }
      return userId;
    });

    const response = (yield call(
      API.get,
      `${endpoints.telaunica_api}/weather/${userId}`
    )) as IWeather;

    const weatherData = {
      ...response,
      temp: Math.round(response.temp),
    };
    yield put(fetchSuccess(weatherData));
  } catch (error) {
    yield put(fetchError());
  }
}

export function* weatherSaga(): Generator {
  yield all([takeLatest(WeatherActionTypes.FETCH, handleWeather)]);
}
