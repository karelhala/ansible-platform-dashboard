import {
  PageSection, Text, TextContent, Title
} from '@patternfly/react-core';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import PropTypes from 'prop-types';
import AutomationIcon from '../../images/Headers-Red_Hat-White_Automation.svg';
import { useIntl } from 'react-intl';

const DashboardHeader = ({ title, description, renderButtons }) => {
  const intl = useIntl();

  return (<React.Fragment>
    <PageSection style={ { backgroundImage: `url(${AutomationIcon})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', paddingTop: '32px' } }>
      <Grid>
        <GridItem>
          <Flex direction={ { default: 'column' } } spaceItems={ { modifier: 'spaceItemsXl' } }>
            <FlexItem>
              <Title headingLevel="h1">{ title }</Title>
            </FlexItem>
            <FlexItem>
              <Grid>
                <GridItem span={ 7 }>
                  <Text component="p">
                    { description }
                  </Text>
                </GridItem>
              </Grid>
            </FlexItem>
            <FlexItem>
              { renderButtons(intl) }
            </FlexItem>
          </Flex>
        </GridItem>
      </Grid>
    </PageSection>
  </React.Fragment>);
};

DashboardHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  renderButtons: PropTypes.func.isRequired
};

export default DashboardHeader;
