export type IWeatherState = {
  readonly icon: string;
  readonly temp: number;
  readonly isLoading: boolean;
};

export type IWeather = {
  icon: string;
  temp: number;
};

export const WeatherActionTypes = {
  FETCH: '@@weather/FETCH_WEATHER',
  FETCH_SUCCESS: '@@weather/FETCH_WEATHER_SUCCESS',
  FETCH_ERROR: '@@weather/FETCH_WEATHER_ERROR',
};
