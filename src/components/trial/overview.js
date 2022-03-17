import React, { useState } from 'react';
import { useIntl } from 'react-intl';
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

const Overview = () => {
  const [activeFaq, openFaq] = useState();
  const intl = useIntl();

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
      { intl.formatMessage(trialMessages[`faq${index}b`], values) }
    </AccordionContent>
  </AccordionItem>);

  return <React.Fragment>
    <DashboardHeader title={ intl.formatMessage(messages.overview) }
      description={ '' }/>
    <PageSection>
      <Stack hasGutter="md">
        <StackItem>
          <Title headingLevel="h1" size="3xl">
            { intl.formatMessage(trialMessages.header) }
          </Title>
          <TextContent>
            <Text>
              { intl.formatMessage(trialMessages.description) }
            </Text>
          </TextContent>
          <Button>
            { intl.formatMessage(trialMessages.startButton) }
          </Button>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              { intl.formatMessage(trialMessages.adCardHeader) }
            </CardTitle>
            <CardBody>
              <Stack>
                { intl.formatMessage(trialMessages.adCardContent, {
                  li: (chunks) => <StackItem><Text>{ chunks }</Text></StackItem>
                }) }
              </Stack>
            </CardBody>
            <CardFooter>
              { intl.formatMessage(trialMessages.adCardFooter) }
            </CardFooter>
          </Card>
        </StackItem>
        <StackItem>
          <Card>
            <CardTitle>
              { intl.formatMessage(trialMessages.reqCardHeader) }
            </CardTitle>
            <CardBody>
              <Stack>
                <StackItem>
                  { intl.formatMessage(trialMessages.reqCardRHELTitle) }
                  { intl.formatMessage(trialMessages.reqCardRHELContent) }
                </StackItem>
                <StackItem>
                  { intl.formatMessage(trialMessages.reqCardBreakTitle) }
                  { intl.formatMessage(trialMessages.reqCardBreakContent) }
                </StackItem>
              </Stack>
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
            { createAccordionItem(1) }
            { createAccordionItem(2) }
            { createAccordionItem(3, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ul: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>
            }) }
            { createAccordionItem(4) }
            { createAccordionItem(5) }
            { createAccordionItem(6) }
            { createAccordionItem(7, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ol: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>
            }) }
            { createAccordionItem(8) }
            { createAccordionItem(9, {
              ul: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>
            }) }
          </Accordion>
        </StackItem>
        <StackItem>
          <Title headingLevel="h6" size="md">
            { intl.formatMessage(trialMessages.footerTitle) }
          </Title>
          <TextContent>
            { intl.formatMessage(trialMessages.footerContent, {
              p: (chunks) => <Text>{ chunks }</Text>,
              ul: (chunks) => <TextList >{ chunks }</TextList>,
              li: (chunks) => <TextListItem >{ chunks }</TextListItem>
            }) }
          </TextContent>
        </StackItem>
      </Stack>
    </PageSection>
  </React.Fragment>;
};

export default Overview;
