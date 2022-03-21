/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import ExclamationIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

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
  Grid,
  GridItem,
  CardFooter,
  Button,
  CardTitle
} from '@patternfly/react-core';

import { DASHBOARD_ROUTE } from '../../constants/routes';
import Resources from './resources';
import expiredMessages from '../../messages/expired.messages';

const Link = ({ link, children }) => <Text component="a" href={ link } target="_blank" rel="noopener noreferrer">{ children }</Text>;

Link.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node
};

const Expired = () => {
  const intl = useIntl();

  return (
    <React.Fragment>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem component={ ({ href, ...props }) => <RouterLink to={ href } { ...props } /> } to={ DASHBOARD_ROUTE }>
            { intl.formatMessage(expiredMessages.overviewLink) }
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            { intl.formatMessage(expiredMessages.trialExpired) }
          </BreadcrumbItem>
        </Breadcrumb>
        <TextContent>
          <Text>
            <ExclamationIcon className="pf-u-mr-lg" size='lg' color='var(--pf-global--danger-color--100)'/>
            { intl.formatMessage(expiredMessages.title) }
          </Text>
          <Text>
            { intl.formatMessage(expiredMessages.description) }
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
                    { intl.formatMessage(expiredMessages.wannaTry) }
                  </Text>
                  <Text>
                    { intl.formatMessage(expiredMessages.wannaTryText) }
                  </Text>
                </TextContent>
                <Divider/>
                <TextContent>
                  <Text>
                    { intl.formatMessage(expiredMessages.readyBuy) }
                  </Text>
                  <Text>
                    { intl.formatMessage(expiredMessages.readyBuyText, {
                      a: (chunks) => <Link link="https://www.redhat.com/en/about/value-of-subscription">{ chunks }</Link>
                    }) }
                  </Text>
                </TextContent>
                <Grid hasGutter>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardTitle>
                        { intl.formatMessage(expiredMessages.sales) }
                      </CardTitle>
                      <CardBody>
                        { intl.formatMessage(expiredMessages.salesText) }
                      </CardBody>
                      <CardFooter>
                        <Button component="a" href="https://www.redhat.com/en/contact" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(expiredMessages.salesButton) }
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={ 6 }>
                    <Card isFlat className='pf-u-px-md pf-u-h-100'>
                      <CardTitle>
                        { intl.formatMessage(expiredMessages.partners) }
                      </CardTitle>
                      <CardBody>
                        { intl.formatMessage(expiredMessages.partnersText) }
                      </CardBody>
                      <CardFooter>
                        <Button component="a" href="https://redhat.secure.force.com/finder/" target="_blank" rel="noopener noreferrer">
                          { intl.formatMessage(expiredMessages.partnersButton) }
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </Grid>
                <Divider/>
                <Resources />
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </React.Fragment>
  );
};

export default Expired;
