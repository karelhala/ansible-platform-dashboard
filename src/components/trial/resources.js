/* eslint-disable max-len */

import React from 'react';
import { useIntl } from 'react-intl';
import ExternalLinkIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';

import {
  TextContent,
  Text,
  Card,
  CardBody,
  Button,
  CardFooter,
  Grid,
  GridItem,
  Title,
  Flex,
  FlexItem
} from '@patternfly/react-core';

import successMessages from '../../messages/success.messages';

const Resources = () => {
  const intl = useIntl();

  return <React.Fragment>
    <TextContent>
      <Title headingLevel="h2" size="xl">
        { intl.formatMessage(successMessages.resources) }
      </Title>
      <Text className='pf-u-mb-lg'>
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
    <Flex className='pf-u-mt-lg' justifyContent={ { default: 'justifyContentCenter' } }>
      <FlexItem>
        <Button variant="tertiary" icon={ <ExternalLinkIcon /> } iconPosition="right" component="a" href="https://www.redhat.com/en/products/trials/faqs" target="_blank" rel="noopener noreferrer">
          { intl.formatMessage(successMessages.faqLink) }
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="tertiary" icon={ <ExternalLinkIcon /> } iconPosition="right" component="a" href="https://www.redhat.com/en/products/trials" target="_blank" rel="noopener noreferrer">
          { intl.formatMessage(successMessages.allTrials) }
        </Button>
      </FlexItem>
    </Flex>
  </React.Fragment>;
};

export default Resources;
