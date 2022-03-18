/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import {
  TextContent,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Card,
  Divider,
  CardBody,
  Stack,
  StackItem,
  Button,
  TextList,
  TextListItem
} from '@patternfly/react-core';

import { DASHBOARD_ROUTE } from '../../constants/routes';
import successMessages from '../../messages/success.messages';
import Requirements from './requirements';
import Resources from './resources';

const Link = ({ link, children }) => <Text component="a" href={ link } target="_blank" rel="noopener noreferrer">{ children }</Text>;

Link.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node
};

const Success = () => {
  const intl = useIntl();

  return (
    <React.Fragment>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem component={ ({ href, ...props }) => <RouterLink to={ href } { ...props } /> } to={ DASHBOARD_ROUTE }>
            { intl.formatMessage(successMessages.overviewLink) }
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            { intl.formatMessage(successMessages.download) }
          </BreadcrumbItem>
        </Breadcrumb>
        <TextContent>
          <Text>
            { intl.formatMessage(successMessages.title) }
          </Text>
          <Text>
            { intl.formatMessage(successMessages.description) }
          </Text>
          <Text component='small'>
            { intl.formatMessage(successMessages.titleFooter, {
              a: (chunks) => <Link link="https://www.redhat.com/en/about/agreements">{ chunks }</Link>
            }) }
          </Text>
        </TextContent>
      </PageHeader>
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardBody>
                <TextContent>
                  <Text>
                    { intl.formatMessage(successMessages.installation) }
                  </Text>
                  <Button>
                    { intl.formatMessage(successMessages.startDownload) }
                  </Button>
                  <Text>
                    { intl.formatMessage(successMessages.downloadNote, {
                      a: (chunks) => <Link link="https://access.redhat.com/downloads/content/480">{ chunks }</Link>
                    }) }
                  </Text>
                </TextContent>
                <Divider/>
                <Requirements />
                <Divider/>
                <TextContent>
                  <Text>
                    { intl.formatMessage(successMessages.nextSteps) }
                  </Text>
                  <Text>
                    { intl.formatMessage(successMessages.deployAnsible) }
                  </Text>
                  { intl.formatMessage(successMessages.deployAnsibleText,
                    {
                      ul: (chunks) => <TextList >{ chunks }</TextList>,
                      li: (chunks) => <TextListItem >{ chunks }</TextListItem>,
                      a: (chunks) => <Link link="https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/2.1/html/red_hat_ansible_automation_platform_installation_guide/index">{ chunks }</Link>,
                      a1: (chunks) => <Link link="https://docs.ansible.com/automation-controller/latest/html/quickstart/index.html">{ chunks }</Link>,
                      a2: (chunks) => <Link link="https://www.redhat.com/en/services/training/do007-ansible-essentials-simplicity-automation-technical-overview">{ chunks }</Link>
                    }) }
                  <Text>
                    { intl.formatMessage(successMessages.learnAnsible) }
                  </Text>
                  { intl.formatMessage(successMessages.learnAnsibleText, {
                    ul: (chunks) => <TextList >{ chunks }</TextList>,
                    li: (chunks) => <TextListItem >{ chunks }</TextListItem>,
                    a: (chunks) => <Link link="https://www.redhat.com/en/technologies/management/ansible/features#automation-execution-environments">{ chunks }</Link>,
                    a1: (chunks) => <Link link="https://www.ansible.com/resources/videos/quick-start-video">{ chunks }</Link>
                  }) }
                </TextContent>
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardBody>
                <TextContent>
                  <Text>
                    { intl.formatMessage(successMessages.support) }
                  </Text>
                  <Text>
                    { intl.formatMessage(successMessages.supportText) }
                  </Text>
                </TextContent>
                <Divider/>
                <Resources />
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </React.Fragment>
  );
};

export default Success;
