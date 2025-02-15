import React from 'react';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import ConfigureCard from '../shared/configure-card';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';

const renderAnalyticsConfigButton = (intl) => (
  <React.Fragment>
    <Flex>
      <FlexItem>
        <Button
          component='a'
          variant='link'
          target="_blank"
          rel="noopener noreferrer"
          href={ `https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/` +
          `1.2/html/getting_started_with_automation_services_catalog/index` }>
          { intl.formatMessage(messages.configureAnalyticsLink) }&nbsp;
          <ExternalLinkAltIcon />
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>
);

const ConfigureAnalyticsCard = () => {
  const intl = useIntl();
  return (<ConfigureCard
    title={ intl.formatMessage(messages.configureAnalyticsTitle) }
    description={ intl.formatMessage(messages.configureAnalyticsDescription) }
    renderButtons={ () => renderAnalyticsConfigButton(intl) }/>);
};

export default ConfigureAnalyticsCard;
