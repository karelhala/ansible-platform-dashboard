import {
  BackgroundImage,
  Button, PageSection, Text, TextContent
} from '@patternfly/react-core';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';
import AutomationIcon from '../../images/Headers-Red_Hat-White_Automation.svg';

const NoAppState = () => {
  return <React.Fragment>
    <PageSection aty>
      <Grid>
        <GridItem>
          <Flex direction={ { default: 'column' } }>
            <FlexItem spacer={ { default: 'spacer2xl' } }>
              <TextContent>
                <Text component="h1">Get started with Red Hat Ansible Automation Platform</Text>
                <Text component="p">
                    Red Hat Ansible Automation Platform simplifies the development and operation <br/>
                    of automation workloads across diverse hybrid environments using Ansible Tower, certified and <br/>
                    supported content collections, and the hosted services on cloud.redhat.com
                </Text>
              </TextContent>
            </FlexItem>
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
                className='pf-m-plain'
                component='a'
                variant='link'
                target='_blank'
                rel='noreferrer'
                href='https://www.redhat.com/en/technologies/management/ansible'>
                    Learn more
                <ArrowRightIcon />
              </Button>
            </FlexItem>
          </Flex>
        </GridItem>
        <GridItem>
          <BackgroundImage src={ 'url("../../../static/images/Headers-Red_Hat-White_Automation.svg")' }/>
        </GridItem>
      </Grid>
    </PageSection>
  </React.Fragment>;
};

export default NoAppState;
