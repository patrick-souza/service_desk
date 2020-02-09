import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import { PersistGate } from 'redux-persist/integration/react';
import 'Config/reactotron-config';
import { store, persistor } from './Redux';
import Routes from './Routes';
import history from './Util/history';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider locale={ptBR}>
          <Router history={history}>
            <Routes />
          </Router>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}
