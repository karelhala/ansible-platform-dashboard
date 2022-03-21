/* eslint-disable max-len */
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import DownloadIcon from '@patternfly/react-icons/dist/js/icons/download-icon';
import ClockIcon from '@patternfly/react-icons/dist/js/icons/clock-icon';

import {
  Card,
  CardBody,
  CardTitle,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title
} from '@patternfly/react-core';

import trialMessages from '../../messages/trial.messages';

const Link = ({ link, children }) => <Text component="a" href={ link } target="_blank" rel="noopener noreferrer">{ children }</Text>;

Link.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node
};

const Requirements = () => {
  const intl = useIntl();

  return (<React.Fragment>
    <TextContent>
      <Title headingLevel="h2" size="lg" className='pf-u-mb-lg'>
        { intl.formatMessage(trialMessages.reqCardHeader) }
      </Title>
    </TextContent>
    <Stack>
      <StackItem>
        <div className='pf-u-display-flex'>
          <div>
            <DownloadIcon className="pf-u-mr-lg" size='xl'/>
          </div>
          <div style={ { flexGrow: 1, alignSelf: 'center' } }>
            <TextContent>
              <Title headingLevel="h2" size="lg">
                { intl.formatMessage(trialMessages.reqCardRHELTitle) }
              </Title>
              { intl.formatMessage(trialMessages.reqCardRHELContent, {
                a: (chunks) => <Link link="https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/auth?client_id=rh-product-eval&redirect_uri=https%3A%2F%2Fwww.redhat.com%2Fen%2Ftechnologies%2Flinux-platforms%2Fenterprise-linux%2Ftry-it%2Fsuccess-server&state=efc13e3d-8e01-463c-8f03-892932906f8e&response_mode=fragment&response_type=code&scope=openid&nonce=6448c8c6-364f-485b-841f-4fc9f2d19494">{ chunks }</Link>,
                a1: (chunks) => <Link link="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/performing_a_standard_rhel_installation/index">{ chunks }</Link>
              }) }
            </TextContent>
          </div>
        </div>
      </StackItem>
      <StackItem>
        <div className='pf-u-display-flex'>
          <div>
            <ClockIcon className="pf-u-mr-lg" size='xl' />
          </div>
          <div style={ { flexGrow: 1, alignSelf: 'center' } }>
            <TextContent>
              <Title headingLevel="h2" size="lg">
                { intl.formatMessage(trialMessages.reqCardBreakTitle) }
              </Title>
              { intl.formatMessage(trialMessages.reqCardBreakContent, {
                a: (chunks) => <Link link="https://cloud.redhat.com/ansible/automation-hub">{ chunks }</Link>
              }) }
            </TextContent>
          </div>
        </div>
      </StackItem>
    </Stack>
  </React.Fragment>);
};

export default Requirements;
