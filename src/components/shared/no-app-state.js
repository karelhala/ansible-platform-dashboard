import React from 'react';
import DashboardHeader from './dashboard-header';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';

const renderButtons = () => (
  <React.Fragment>
    <Flex>
      <FlexItem>
        <Button
          isLarge
          component='a'
          variant='primary'
          href={ `https://www.redhat.com/en/technologies/management/ansible/try-it` }>
          Try it free
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
          Learn more &nbsp;
          <ArrowRightIcon />
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>
);

const NoAppState = () => {
  return <React.Fragment>
    <DashboardHeader renderButtons={ renderButtons } />
  </React.Fragment>;
};

export default NoAppState;
