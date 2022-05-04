import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import HubCard from '../automation-hub/hub-card';
import AnalyticsCard from '../analytics/analytics-card';
import { useSelector } from 'react-redux';
import ConfigureAppPage from './configure-app-page';
import NoAppState from '../shared/no-app-state';

const PlatformPage = () => {
  const intl = useIntl();
  const { isAnalyticsAvailable } = useSelector(
    ({
      analyticsReducer: {
        isAnalyticsAvailable
      }
    }) => ({ isAnalyticsAvailable })
  );

  const { isHubAvailable } = useSelector(
    ({
      hubReducer: {
        isHubAvailable: isHubAvailable
      }
    }) => ({ isHubAvailable })
  );

  if (!isAnalyticsAvailable && !isHubAvailable) {
    return <NoAppState/>;
  }

  if (isHubAvailable && !isAnalyticsAvailable) {
    return <ConfigureAppPage/>;
  }

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
      </Stack>
    </PageSection>
  </React.Fragment>;
};

export default PlatformPage;
