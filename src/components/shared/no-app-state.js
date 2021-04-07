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
    <PageSection style={ { backgroundImage: `url(${AutomationIcon})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat',
      backgroundPositionY: '-8px' } }>
      <Grid>
        <GridItem>
          <Flex direction={ { default: 'column' } }>
            <FlexItem spacer={ { default: 'spacer2xl' } }>
              <TextContent>
                <Text component="h1">Get started with Red Hat Ansible Automation Platform</Text>
                <br/>
                <Text component="p">
                  Red Hat Ansible Automation Platform simplifies the development and operation of automation<br/>
                  workloads across diverse hybrid environments using Ansible Tower, certified and supported content <br/>
                  collections, and the hosted services on cloud.redhat.com
                </Text>
              </TextContent>
            </FlexItem>
            <FlexItem>
              <Flex>
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
                    component='a'
                    isLarge
                    variant='link'
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.redhat.com/en/technologies/management/ansible'>
                    Learn more &nbsp;
                    <ArrowRightIcon />
                  </Button>
                </FlexItem>
              </Flex>
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
