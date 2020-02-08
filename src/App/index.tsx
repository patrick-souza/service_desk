import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import history from './util/history';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
