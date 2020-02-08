import { WeatherActionTypes, IWeather } from './types';
import { IReducerAction } from '..';
import FactoryAction from 'App/Util/FactoryAction';

export const fetchWeather = (): IReducerAction<{}> =>
  FactoryAction(WeatherActionTypes.FETCH, {});

export const fetchSuccess = (weather: IWeather): IReducerAction<IWeather> =>
  FactoryAction(WeatherActionTypes.FETCH_SUCCESS, weather);

export const fetchError = (): IReducerAction<{}> =>
  FactoryAction(WeatherActionTypes.FETCH_ERROR, {});
