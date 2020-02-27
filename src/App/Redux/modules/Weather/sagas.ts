import { takeLatest, all, select, call, put } from 'redux-saga/effects';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import { WeatherActionTypes, IWeather } from './types';
import { IApplicationState } from '..';
import { fetchSuccess, fetchError } from './actions';

function* handleWeather(): Generator {
  try {
    const userId = yield select(({ auth }: IApplicationState) => {
      let id = '0';
      if (auth.user) {
        id = auth.user.id;
      }
      return id;
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

export default function* weatherSaga(): Generator {
  yield all([takeLatest(WeatherActionTypes.FETCH, handleWeather)]);
}
