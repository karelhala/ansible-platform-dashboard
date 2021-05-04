import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import HubCard from '../automation-hub/hub-card';
import CatalogCard from '../catalog/catalog-card';
import AnalyticsCard from '../analytics/analytics-card';

const PlatformPage = () => {
  const intl = useIntl();
  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.overview) }
      description={ '' }/>
    <PageSection>
      <Stack hasGutter="md">
        <StackItem>
          <AnalyticsCard/>
        </StackItem>
        <StackItem>
          <HubCard/>
        </StackItem>
        <StackItem>
          <CatalogCard/>
        </StackItem>
      </Stack>
    </PageSection>
  </React.Fragment>;
};

export default PlatformPage;
