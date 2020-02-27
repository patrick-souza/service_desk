import produce from 'immer';
import { IReducerAction } from '..';
import { IWeather, IWeatherState, WeatherActionTypes } from './types';

export const initialState: IWeatherState = {
  isLoading: false,
  temp: 0,
  icon: '',
};

export const weatherReducer = (
  state: IWeatherState = initialState,
  action: IReducerAction<IWeather>
): IWeatherState => {
  switch (action.type) {
    case WeatherActionTypes.FETCH: {
      return produce(initialState, draft => {
        draft.isLoading = true;
      });
    }
    case WeatherActionTypes.FETCH_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.payload) {
          const { temp, icon } = action.payload;
          draft.temp = temp;
          draft.icon = icon;
        }
      });
    }
    case WeatherActionTypes.FETCH_ERROR: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.icon = '';
        draft.temp = 0;
      });
    }
    default:
      return state;
  }
};
