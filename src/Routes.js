import React, { lazy } from 'react';

import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/dashboard/dashboard'));

export const Routes = () => <Route path='/ansible-dashboard' component={ Dashboard }/>;
