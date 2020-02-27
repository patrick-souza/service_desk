import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from './Util/AuthRoute';

import LoginPage from './Pages/Login';
import DashboardPage from './Pages/Dashboard';
import ExtractPage from './Pages/Extract';
import BearerPage from './Pages/Bearer';
import Page404 from './Pages/404';
import Page401 from './Pages/401';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <AuthRoute path="/extract" component={ExtractPage} />
      <AuthRoute path="/dashboard" component={DashboardPage} />
      <AuthRoute path="/bearer" component={BearerPage} />
      <Route path="/401" component={Page401} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
