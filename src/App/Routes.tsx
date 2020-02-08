import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './Pages/Login';
import DashboardPage from './Pages/Dashboard';
import AuthRoute from './util/AuthRoute';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <AuthRoute path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}
