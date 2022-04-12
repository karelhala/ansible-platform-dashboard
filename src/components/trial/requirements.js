/* eslint-disable max-len */
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Stack,
  StackItem,
  TextContent,
  Title
} from '@patternfly/react-core';

import trialMessages from '../../messages/trial.messages';
import Link from './link';

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
            <pfe-icon icon="rh-icon-install" size="xl" />
          </div>
          <div style={ { flexGrow: 1, alignSelf: 'center' } }>
            <TextContent>
              <Title headingLevel="h2" size="lg" className='pf-u-mb-sm'>
                { intl.formatMessage(trialMessages.reqCardRHELTitle) }
              </Title>
              { intl.formatMessage(installText, {
                a: (chunks) => <Link link="https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/auth?client_id=rh-product-eval&redirect_uri=https%3A%2F%2Fwww.redhat.com%2Fen%2Ftechnologies%2Flinux-platforms%2Fenterprise-linux%2Ftry-it%2Fsuccess-server&state=efc13e3d-8e01-463c-8f03-892932906f8e&response_mode=fragment&response_type=code&scope=openid&nonce=6448c8c6-364f-485b-841f-4fc9f2d19494">{ chunks }</Link>,
                a1: (chunks) => <Link link="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/performing_a_standard_rhel_installation/index">{ chunks }</Link>
              }) }
            </TextContent>
          </div>
        </div>
      </StackItem>
      <StackItem>
        <div className='pf-u-display-flex'>
          <div className='pf-u-mr-md'>
            <pfe-icon icon="rh-icon-clock-time-pass" size="xl" />
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
