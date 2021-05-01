import { Grid, GridItem, Flex, FlexItem, Title  } from '@patternfly/react-core';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import MarketingBanner from './marketing-banner';

const DashboardHeader = ({ title, description, renderButtons }) => {
  const intl = useIntl();

  return (<React.Fragment>
    <MarketingBanner
      hasGraphic
      graphicRight
      light1000
      fullBleed

      style={ {
        '--ins-c-marketing-banner--graphic--width-on-md': '200px',
        '--ins-c-marketing-banner--graphic--width-on-xl': '400px'
      } }>
      <Grid>
        <GridItem>
          <Flex direction={ { default: 'column' } }>
            <FlexItem>
              <Title headingLevel='h1' size='2xl'>
                { title }
              </Title>
            </FlexItem>
            <FlexItem spacer={ { default: 'spacer2xl' } }>
              <div className='ins-c-width-limiter' style={ { '--ins-c-width-limiter--MaxWidth': '600px' } }>
                <p className='ins-c-text--black-400'>{ description }</p>
              </div>
            </FlexItem>
            { renderButtons ? <FlexItem>
              { renderButtons(intl) }
            </FlexItem> : null
            }
          </Flex>
        </GridItem>
      </Grid>
    </MarketingBanner>
  </React.Fragment>);
};

DashboardHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  renderButtons: PropTypes.func.isRequired
};

export default DashboardHeader;
