import { Store, applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootModules, { IApplicationState } from './modules';

const persistConfig = {
  key: 'telaunica_frontend',
  storage,
  whitelist: ['auth'],
};
const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const persistedReducer = persistReducer(persistConfig, rootModules.reducers);

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store: Store<IApplicationState> = createStore(
  persistedReducer,
  enhancer as any
);

sagaMiddleware.run(rootModules.rootSaga);

const persistor = persistStore(store);

export { store, persistor };
