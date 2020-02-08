import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from './Util/AuthRoute';

import LoginPage from './Pages/Login';
import DashboardPage from './Pages/Dashboard';
import Page404 from './Pages/404';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <AuthRoute path="/dashboard" component={DashboardPage} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
