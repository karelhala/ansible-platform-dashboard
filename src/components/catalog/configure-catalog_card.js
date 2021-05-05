import React from 'react';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import ConfigureCard from '../shared/configure-card';
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

const ConfigureCatalogCard = () => {
  const intl = useIntl();
  return <React.Fragment>
    <ConfigureCard
      title={ intl.formatMessage(messages.configureCatalogTitle) }
      description={ intl.formatMessage(messages.configureCatalogDescription) }
      renderButtons={ () => renderCatalogConfigButton(intl) }/>
  </React.Fragment>;
};

export default ConfigureCatalogCard;
