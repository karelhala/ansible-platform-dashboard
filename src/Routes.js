import React, { lazy } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { DASHBOARD_ROUTE, TRIAL_ROUTE } from './constants/routes';

const Dashboard = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/dashboard/dashboard'));
const TrialOverview = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/trial/overview'));

export const Routes = () => <Switch>
  <Route path={ TRIAL_ROUTE } component={ TrialOverview }/>
  <Route path={ DASHBOARD_ROUTE } component={ Dashboard }/>
  <Route>
    <Redirect to={ DASHBOARD_ROUTE }/>
  </Route>
</Switch>;
