import {
  PageSection, Text, TextContent
} from '@patternfly/react-core';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import PropTypes from 'prop-types';
import AutomationIcon from '../../images/Headers-Red_Hat-White_Automation.svg';

const DashboardHeader = ({ renderButtons }) => {
  return (<React.Fragment>
    <PageSection style={ { backgroundImage: `url(${AutomationIcon})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat',
      marginTop: '0px', marginBottom: '0px', marginRight: '0px',
      backgroundPositionX: '0px', backgroundPositionY: '0px' } }>
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
              { renderButtons() }
            </FlexItem>
          </Flex>
        </GridItem>
      </Grid>
    </PageSection>
  </React.Fragment>);
};

DashboardHeader.propTypes = {
  renderButtons: PropTypes.func.isRequired
};

export default DashboardHeader;
