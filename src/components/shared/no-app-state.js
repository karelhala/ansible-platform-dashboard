import React from 'react';
import DashboardHeader from './dashboard-header';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import messages from '../../messages/messages';
import { useIntl } from 'react-intl';

const renderButtons = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        isLarge
        component='a'
        variant='primary'
        href={ `https://www.redhat.com/en/technologies/management/ansible/try-it` }>
        { intl.formatMessage(messages.tryItButton) }
      </Button>
    </FlexItem>
    <FlexItem>
      <Button
        component='a'
        isLarge
        variant='link'
        target='_blank'
        rel='noreferrer'
        href='https://www.redhat.com/en/technologies/management/ansible'>
        { intl.formatMessage(messages.learnMoreButton) } &nbsp;
        <ArrowRightIcon />
      </Button>
    </FlexItem>
  </Flex>
);

const NoAppState = () => {
  const intl = useIntl();

  return <DashboardHeader title={ intl.formatMessage(messages.noAppTitle) }
    description={ intl.formatMessage(messages.noAppDescription) }
    renderButtons={ renderButtons } />;
};

export default NoAppState;
