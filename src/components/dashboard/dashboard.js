import React from 'react';
import NoAppState from '../shared/no-app-state';
import AnalyticsCard from '../analytics/analytics-card';
import CatalogCard from '../catalog/catalog-card';
import HubCard from '../automation-hub/hub-card';
import { Divider } from '@patternfly/react-core';

const Dashboard = () => {
  return <React.Fragment>
    <NoAppState />
    <Divider component="div" />
    <PageSection>
      <AnalyticsCard/>
      <CatalogCard/>
      <HubCard/>
    </PageSection>
  </React.Fragment>;
};

export default Dashboard;
