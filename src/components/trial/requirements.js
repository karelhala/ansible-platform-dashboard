/* eslint-disable max-len */
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  Stack,
  StackItem,
  TextContent,
  Title
} from '@patternfly/react-core';

import trialMessages from '../../messages/trial.messages';
import Link from './link';
import downloadTrial from './download-trial';
import { RHEL_CHECKSUM } from './constants';

const Requirements = ({ afterTrial }) => {
  const intl = useIntl();

  const installText = afterTrial ? trialMessages.installRHETrial : trialMessages.reqCardRHELContent;
  const startInstallText = afterTrial ? trialMessages.startInstallTrial : trialMessages.reqCardBreakContent;

  return (<React.Fragment>
    <TextContent>
      <Title headingLevel="h2" size="lg" className='pf-u-mb-lg'>
        { intl.formatMessage(trialMessages.reqCardHeader) }
      </Title>
    </TextContent>
    <Stack>
      <StackItem>
        <div className='pf-u-display-flex'>
          <div className='pf-u-mr-md'>
            <pfe-icon icon="rh-icon-install" size="lg" />
          </div>
          <div style={ { flexGrow: 1, alignSelf: 'center' } }>
            <TextContent>
              <Title headingLevel="h2" size="lg" className='pf-u-mb-sm'>
                { intl.formatMessage(trialMessages.reqCardRHELTitle) }
              </Title>
              { intl.formatMessage(installText, {
                a1: (chunks) => <Link link="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/performing_a_standard_rhel_9_installation/index">{ chunks }</Link>,
                button: (chunks) => <Button isInline variant='link' onClick={ () => downloadTrial(RHEL_CHECKSUM) }>{ chunks }</Button>
              }) }
            </TextContent>
          </div>
        </div>
      </StackItem>
      <StackItem>
        <div className='pf-u-display-flex'>
          <div className='pf-u-mr-md'>
            <pfe-icon icon="rh-icon-clock-time-pass" size="lg" />
          </div>
          <div style={ { flexGrow: 1, alignSelf: 'center' } }>
            <TextContent>
              <Title headingLevel="h2" size="lg" className='pf-u-mb-sm'>
                { intl.formatMessage(trialMessages.reqCardBreakTitle) }
              </Title>
              { intl.formatMessage(startInstallText, {
                a: (chunks) => <Link link="https://console.redhat.com/ansible/automation-hub">{ chunks }</Link>
              }) }
            </TextContent>
          </div>
        </div>
      </StackItem>
    </Stack>
  </React.Fragment>);
};

Requirements.propTypes = {
  afterTrial: PropTypes.bool
};

export default Requirements;
