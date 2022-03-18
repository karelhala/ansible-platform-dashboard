/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import ExternalLinkIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';

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
  CardFooter,
  Grid,
  GridItem
} from '@patternfly/react-core';

import { DASHBOARD_ROUTE } from '../../constants/routes';
import successMessages from '../../messages/success.messages';
import Requirements from './requirements';

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
                <TextContent>
                  <Text>
                    { intl.formatMessage(successMessages.resources) }
                  </Text>
                  <Text>
                    { intl.formatMessage(successMessages.resourcesDescription) }
                  </Text>
                </TextContent>
                <Grid hasGutter>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardBody>
                        { intl.formatMessage(successMessages.instructionsText) }
                      </CardBody>
                      <CardFooter>
                        <Button variant="link" isLarge isInline component="a" href="https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/2.1/html/red_hat_ansible_automation_platform_installation_guide/index" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(successMessages.instructionsLink) } <ArrowRightIcon />
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardBody>
                        { intl.formatMessage(successMessages.documentationText) }
                      </CardBody>
                      <CardFooter>
                        <Button variant="link" isLarge isInline component="a" href="https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/2.1" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(successMessages.documentationLink) } <ArrowRightIcon />
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardBody>
                        { intl.formatMessage(successMessages.otherVersionsText) }
                      </CardBody>
                      <CardFooter>
                        <Button variant="link" isLarge isInline component="a" href="https://access.redhat.com/downloads/content/480" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(successMessages.otherVersionsLink) } <ArrowRightIcon />
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardBody>
                        { intl.formatMessage(successMessages.customerServiceText) }
                      </CardBody>
                      <CardFooter>
                        <Button variant="link" isLarge isInline component="a" href="https://www.redhat.com/en/contact?contact=customer-service#tab.contact-method.1" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(successMessages.customrServiceLink) } <ArrowRightIcon />
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </Grid>
                <Button variant="tertiary" icon={ <ExternalLinkIcon /> } iconPosition="right" component="a" href="https://www.redhat.com/en/products/trials/faqs" target="_blank" rel="noopener noreferrer">
                  { intl.formatMessage(successMessages.faqLink) }
                </Button>
                <Button variant="tertiary" icon={ <ExternalLinkIcon /> } iconPosition="right" component="a" href="https://www.redhat.com/en/products/trials" target="_blank" rel="noopener noreferrer">
                  { intl.formatMessage(successMessages.allTrials) }
                </Button>
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </React.Fragment>
  );
};

export default Success;
