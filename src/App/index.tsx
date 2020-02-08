import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import history from './Util/history';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
