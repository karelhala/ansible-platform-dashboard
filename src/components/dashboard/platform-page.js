import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { Button, PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import HubCard from '../automation-hub/hub-card';
import CatalogCard from '../catalog/catalog-card';
import JobsChart from '../analytics/jobs-chart';

const renderButtons = (intl) => (
  <React.Fragment>
    <Button
      isLarge
      component='a'
      variant='primary'
      href={ `https://docs.ansible.com/ansible-tower/latest/html/quickinstall/index.html` }>
      { intl.formatMessage(messages.configureLink) }
    </Button>
  </React.Fragment>
);

const PlatformPage = () => {
  const intl = useIntl();

  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.noAppTitle) }
      description={ intl.formatMessage(messages.configDescription) }
      renderButtons={ () => renderButtons(intl) } />
    <PageSection>
      <Stack hasGutter="md">
        <StackItem>
          <JobsChart/>
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
