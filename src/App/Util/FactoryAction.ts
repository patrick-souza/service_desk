import { IReducerAction } from 'App/Redux/modules';

export default <T>(type: string, payload: T = {} as T): IReducerAction<T> => {
  return { type, payload };
};
