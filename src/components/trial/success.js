/* eslint-disable max-len */

import React from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import DownloadIcon from '@patternfly/react-icons/dist/js/icons/download-icon';

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
  TextListItem,
  Flex,
  FlexItem,
  Title
} from '@patternfly/react-core';

import { DASHBOARD_ROUTE } from '../../constants/routes';
import successMessages from '../../messages/success.messages';
import Requirements from './requirements';
import Resources from './resources';
import Logo from './logo';
import Link from './link';
import downloadTrial from './download-trial';
import { ANSIBLE_CHECKSUM } from './constants';

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
          <Flex spaceItems={ { default: 'spaceItemsSm' } } alignItems={ { default: 'alignItemsCenter' } }>
            <FlexItem>
              <CheckCircleIcon size='md' color='var(--pf-global--success-color--100)'/>
            </FlexItem>
            <FlexItem>
              <Title headingLevel="h2" size="lg">
                { intl.formatMessage(successMessages.title) }
              </Title>
            </FlexItem>
          </Flex>
          <Text className='pf-u-mt-md'>
            { intl.formatMessage(successMessages.description) }
          </Text>
          <Text component='small'>
            { intl.formatMessage(successMessages.titleFooter) }
          </Text>
        </TextContent>
      </PageHeader>
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="xl" className='pf-u-mb-md'>
                  { intl.formatMessage(successMessages.installation) }
                </Title>
                <div className='pf-u-display-flex pf-u-flex-wrap' style={ { rowGap: '16px' } }>
                  <Flex className="pf-u-align-self-center pf-u-flex-grow-1 pf-u-flex-nowrap">
                    <div className='pf-u-mr-md'>
                      <pfe-icon icon="rh-icon-install" size="lg" />
                    </div>
                    <div className='pf-u-align-self-center pf-u-flex-grow-1'>
                      <TextContent>
                        <Button icon={ <DownloadIcon /> } className="pf-u-mb-md" onClick={ () => downloadTrial(ANSIBLE_CHECKSUM) }>
                          { intl.formatMessage(successMessages.startDownload) }
                        </Button>
                        <Text>
                          { intl.formatMessage(successMessages.downloadNote, {
                            a: (chunks) => <Link link="https://access.redhat.com/downloads/content/480">{ chunks }</Link>
                          }) }
                        </Text>
                      </TextContent>
                    </div>
                  </Flex>
                  <Logo />
                </div>
                <Divider className='pf-u-my-lg'/>
                <Requirements afterTrial />
                <Divider className='pf-u-my-lg'/>
                <TextContent>
                  <Title headingLevel="h2" size="xl">
                    { intl.formatMessage(successMessages.nextSteps) }
                  </Title>
                  <div className='pf-u-display-flex pf-u-mb-lg'>
                    <div className='pf-u-mr-md'>
                      <Title headingLevel="h2" size="2xl" className='ans-c-trial__number'>
                        1
                      </Title>
                    </div>
                    <div style={ { flexGrow: 1, alignSelf: 'center' } }>
                      <Title headingLevel="h2" size="xl">
                        { intl.formatMessage(successMessages.deployAnsible) }
                      </Title>
                      <TextContent>
                        { intl.formatMessage(successMessages.deployAnsibleText,
                          {
                            ul: (chunks) => <TextList className='pf-u-ml-0'>{ chunks }</TextList>,
                            li: (chunks) => <TextListItem className='pf-u-mt-0' >{ chunks }</TextListItem>,
                            a: (chunks) => <Link link="https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/2.1/html/red_hat_ansible_automation_platform_installation_guide/index">{ chunks }</Link>,
                            a1: (chunks) => <Link link="https://docs.ansible.com/automation-controller/latest/html/quickstart/index.html">{ chunks }</Link>,
                            a2: (chunks) => <Link link="https://www.redhat.com/en/services/training/do007-ansible-essentials-simplicity-automation-technical-overview">{ chunks }</Link>
                          })
                        }
                      </TextContent>
                    </div>
                  </div>
                  <div className='pf-u-display-flex'>
                    <div className='pf-u-mr-md'>
                      <Title headingLevel="h2" size="2xl" className='ans-c-trial__number'>
                        2
                      </Title>
                    </div>
                    <div style={ { flexGrow: 1, alignSelf: 'center' } }>
                      <Title headingLevel="h2" size="xl">
                        { intl.formatMessage(successMessages.learnAnsible) }
                      </Title>
                      <TextContent>
                        { intl.formatMessage(successMessages.learnAnsibleText, {
                          a: (chunks) => <Link link="https://www.redhat.com/en/technologies/management/ansible/features#automation-execution-environments">{ chunks }</Link>
                        }) }
                      </TextContent>
                    </div>
                  </div>
                </TextContent>
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardBody className='pf-u-pb-0'>
                <Title headingLevel="h2" size="xl">
                  { intl.formatMessage(successMessages.support) }
                </Title>
                <div className='pf-u-display-flex'>
                  <div className='pf-u-mr-md'>
                    <pfe-icon icon="rh-icon-support" size="lg" />
                  </div>
                  <div style={ { flexGrow: 1, alignSelf: 'center' } }>
                    <TextContent>
                      <Text>
                        { intl.formatMessage(successMessages.supportText) }
                      </Text>
                    </TextContent>
                  </div>
                </div>
                <Divider className='pf-u-my-lg'/>
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
