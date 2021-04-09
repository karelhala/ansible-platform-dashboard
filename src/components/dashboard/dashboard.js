import React from 'react';
import NoAppState from '../shared/no-app-state';
import AnalyticsCard from '../analytics/analytics-card';
import CatalogCard from '../catalog/catalog-card';
import HubCard from '../automation-hub/hub-card';
import { Divider, Flex, FlexItem, PageSection } from '@patternfly/react-core';
import ErrorCard from '../shared/ErrorCard';

const Dashboard = () => {
  return <React.Fragment>
    <NoAppState />
    <Divider component="div" />
    <PageSection>
      <Flex>
        <FlexItem>
          <AnalyticsCard/>
        </FlexItem>
        <FlexItem>
          <CatalogCard/>
        </FlexItem>
        <FlexItem>
          <HubCard/>
        </FlexItem>
        <FlexItem>
          <ErrorCard appName={ 'Test' }/>
        </FlexItem>
      </Flex>
    </PageSection>
  </React.Fragment>;
};

export default Dashboard;
