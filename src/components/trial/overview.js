/* eslint-disable max-len */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';

import DashboardHeader from '../shared/dashboard-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  PageSection,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextList,
  TextListItem,
  Title
} from '@patternfly/react-core';

import messages from '../../messages/messages';
import trialMessages from '../../messages/trial.messages';
import Requirements from './requirements';
import Link from './link';
import { TRIAL_PAGE, BETA_TRIAL_PAGE } from './constants';

const Overview = () => {
  const [activeFaq, openFaq] = useState();
  const intl = useIntl();

  const url = insights.chrome.isBeta() ? BETA_TRIAL_PAGE : TRIAL_PAGE;

  const onClick = (index) => () => activeFaq === index ? openFaq(undefined) : openFaq(index);

  const createAccordionItem = (index, values) => (<AccordionItem>
    <AccordionToggle
      isExpanded={ activeFaq === index }
      onClick={ onClick(index) }
    >
      { intl.formatMessage(trialMessages[`faq${index}a`]) }
    </AccordionToggle>
    <AccordionContent
      isHidden={ activeFaq !== index }
    >
      <TextContent>
        { intl.formatMessage(trialMessages[`faq${index}b`], values) }
      </TextContent>
    </AccordionContent>
  </AccordionItem>);

  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.overview) }
      description={ '' }/>
    <PageSection className='pf-u-pt-0 pf-u-mt-xs'>
      <Stack hasGutter="md">
        <StackItem className='ans-c-trial__hero pf-u-pt-xl pf-u-pb-xl pf-u-pl-md pf-u-mb-0'>
          <Title headingLevel="h1" size="xl" className='pf-u-mb-md'>
            { intl.formatMessage(trialMessages.header) }
          </Title>
          <TextContent className='pf-u-mb-lg ans-c-trial__hero__description'>
            <Text>
              { intl.formatMessage(trialMessages.description) }
            </Text>
          </TextContent>
          <Button className='pf-u-px-xl' component="a" href={ url }>
            { intl.formatMessage(trialMessages.startButton) }
          </Button>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              { intl.formatMessage(trialMessages.adCardHeader) }
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                { intl.formatMessage(trialMessages.adCardContent, {
                  a: (chunks) => <Link link="http://console.redhat.com/">{ chunks }</Link>,
                  li: (chunks) => <StackItem>
                    <div className='pf-u-display-flex'>
                      <div>
                        <CheckCircleIcon className="pf-u-mr-lg" size='lg' color='var(--pf-global--success-color--100)'/>
                      </div>
                      <div style={ { flexGrow: 1, alignSelf: 'center' } }>
                        <Text>{ chunks }</Text>
                      </div>
                    </div>
                  </StackItem>
                }) }
              </Stack>
            </CardBody>
            <CardFooter>
              <TextContent>
                <Text component='small'>
                  { intl.formatMessage(trialMessages.adCardFooter, {
                    a: (chunks) => <Link link="https://www.redhat.com/en/about/agreements">{ chunks }</Link>
                  }) }
                </Text>
              </TextContent>
            </CardFooter>
          </Card>
        </StackItem>
        <StackItem>
          <Card>
            <CardBody>
              <Requirements />
            </CardBody>
          </Card>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              { intl.formatMessage(trialMessages.faqTitle) }
            </CardTitle>
          </Card>
          <Accordion isBordered displaySize="large">
            { createAccordionItem(1, {
              a: (chunks) => <Link link="https://access.redhat.com/">{ chunks }</Link>
            }) }
            { createAccordionItem(2) }
            { createAccordionItem(3, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ul: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>,
              a: (chunks) => <Link link="https://access.redhat.com/documentation/en-US/">{ chunks }</Link>,
              a1: (chunks) => <Link link="https://access.redhat.com/search/#/">{ chunks }</Link>
            }) }
            { createAccordionItem(4) }
            { createAccordionItem(5) }
            { createAccordionItem(6, {
              a: (chunks) => <Link link="https://www.redhat.com/en/products/trials">{ chunks }</Link>,
              a1: (chunks) => <Link link="http://www.redhat.com/en/about/contact/sales">{ chunks }</Link>
            }) }
            { createAccordionItem(7, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ol: (chunks) => <TextList component='ol'>{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>,
              a: (chunks) => <Link link="http://www.redhat.com/en/about/contact/sales">{ chunks }</Link>
            }) }
            { createAccordionItem(8, {
              a: (chunks) => <Link link="http://www.redhat.com/en/about/contact/sales">{ chunks }</Link>
            }) }
            { createAccordionItem(9, {
              ul: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>,
              a: (chunks) => <Link link="http://www.redhat.com/en/about/contact/sales">{ chunks }</Link>
            }) }
          </Accordion>
        </StackItem>
        <StackItem className='pf-u-mt-md pf-u-p-md'>
          <Title headingLevel="h2" size="xl" className='pf-u-mb-lg'>
            { intl.formatMessage(trialMessages.footerTitle) }
          </Title>
          <TextContent className='pf-u-font-size-sm'>
            { intl.formatMessage(trialMessages.footerContent, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ul: (chunks) => <TextList className='pf-u-ml-0'>{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>
            }) }
          </TextContent>
        </StackItem>
      </Stack>
    </PageSection>
  </React.Fragment>;
};

export default Overview;
