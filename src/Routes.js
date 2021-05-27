import React, { lazy } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { DASHBOARD_ROUTE } from './constants/routes';

const Dashboard = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/dashboard/dashboard'));

export const Routes = () => <Switch>
  <Route path={ DASHBOARD_ROUTE } component={ Dashboard }/>
  <Route>
    <Redirect to={ DASHBOARD_ROUTE }/>
  </Route>
</Switch>;
