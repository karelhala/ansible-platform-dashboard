import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { Button, Flex, FlexItem, Grid, GridItem, PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import ConfigureCard from '../shared/configure-card';
import HubCard from '../automation-hub/hub-card';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';

const renderButtons = (intl) => (
  <React.Fragment>
    <Flex>
      <FlexItem>
        <Button
          isLarge
          component='a'
          variant='primary'
          href={ `https://docs.ansible.com/ansible-tower/latest/html/quickinstall/index.html` }>
          { intl.formatMessage(messages.configureLink) }
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>
);

const renderAnalyticsConfigButton = (intl) => (
  <React.Fragment>
    <Flex>
      <FlexItem>
        <Button
          component='a'
          variant='link'
          href={ `https://access.redhat.com/documentation/en-us/
          red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/index` }>
          { intl.formatMessage(messages.configureAnalyticsLink) }&nbsp;
          <ExternalLinkAltIcon />
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>
);

const renderCatalogConfigButton = (intl) => (
  <React.Fragment>
    <Flex>
      <FlexItem>
        <Button
          component='a'
          variant='link'
          href={ `https://access.redhat.com/documentation/en-us/
          red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/index` }>
          { intl.formatMessage(messages.configureCatalogLink) }&nbsp;
          <ExternalLinkAltIcon />
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>
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
            <GridItem span={ 6 }>
              <ConfigureCard
                title={ intl.formatMessage(messages.configureAnalyticsTitle) }
                description={ intl.formatMessage(messages.configureAnalyticsDescription) }
                renderButtons={ () => renderAnalyticsConfigButton(intl) }/>
            </GridItem>
            <GridItem span={ 6 }>
              <ConfigureCard
                title={ intl.formatMessage(messages.configureCatalogTitle) }
                description={ intl.formatMessage(messages.configureCatalogDescription) }
                renderButtons={ () => renderCatalogConfigButton(intl) }/>
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
