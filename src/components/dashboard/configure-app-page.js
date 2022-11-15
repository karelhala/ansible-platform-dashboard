import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { Button, Flex, FlexItem, Grid, GridItem, PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import ConfigureCard from '../shared/configure-card';
import HubCard from '../automation-hub/hub-card';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';

const renderButtons = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        isLarge
        component='a'
        variant='primary'
        target="_blank"
        rel="noopener noreferrer"
        href={ `https://access.redhat.com/documentation/en-us/' + 
        'red_hat_ansible_automation_platform/2.2/html/red_hat_ansible_automation_platform_installation_guide/index` }>
        { intl.formatMessage(messages.configureLink) }
      </Button>
    </FlexItem>
  </Flex>
);

const renderAnalyticsConfigButton = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        component='a'
        variant='link'
        target="_blank"
        rel="noopener noreferrer"
        href={ `https://docs.ansible.com/ansible-tower/latest/html/administration/usability_data_collection.html` }>
        { intl.formatMessage(messages.configureAnalyticsLink) }&nbsp;
        <ExternalLinkAltIcon />
      </Button>
    </FlexItem>
  </Flex>
);

const ConfigureAppPage = () => {
  const intl = useIntl();

  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.noAppTitle) }
      description={ intl.formatMessage(messages.configDescription) }
      renderButtons={ () => renderButtons(intl) } />
    <PageSection>
      <Stack hasGutter="md">
        <StackItem>
          <Grid hasGutter="xl">
            <GridItem md={ 12 } sm={ 12 } >
              <ConfigureCard
                title={ intl.formatMessage(messages.configureAnalyticsTitle) }
                description={ intl.formatMessage(messages.configureAnalyticsDescription) }
                renderButtons={ () => renderAnalyticsConfigButton(intl) }/>
            </GridItem>
          </Grid>
        </StackItem>
        <StackItem>
          <HubCard/>
        </StackItem>
      </Stack>
    </PageSection>
  </React.Fragment>;
};

export default ConfigureAppPage;
