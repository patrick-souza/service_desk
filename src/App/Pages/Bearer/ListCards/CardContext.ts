import { createContext, Dispatch } from 'react';
import { IStatusCard } from 'App/Redux/modules/Card';

export default createContext<{
  filter: IStatusCard;
  setFilter: Dispatch<IStatusCard>;
}>({
  filter: 'T',
  setFilter: () => {},
});
