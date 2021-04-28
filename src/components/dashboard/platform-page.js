import React from 'react';
import DashboardHeader from '../shared/dashboard-header';
import { Button, Flex, FlexItem, PageSection, Stack, StackItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import HubCard from '../automation-hub/hub-card';
import CatalogCard from '../catalog/catalog-card';

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

const PlatformPage = () => {
  const intl = useIntl();

  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.noAppTitle) }
      description={ intl.formatMessage(messages.configDescription) }
      renderButtons={ () => renderButtons(intl) } />
    <PageSection>
      <Stack hasGutter="md">
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
