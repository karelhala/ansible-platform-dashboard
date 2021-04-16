import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Grid,
  GridItem, Label,
  Spinner,
  Stack,
  StackItem,
  Text
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchPlatforms, fetchPortfolioItems, fetchPortfolios, fetchOrders } from '../../redux/actions/catalog-actions';

const initialState = {
  isFetching: true
};

const hubState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const CatalogCard = () => {
  const [{ isFetching }, stateDispatch ] = useReducer(hubState, initialState);

  const { portfolioItems, portfolios, orders } = useSelector(
    ({
      catalogReducer: {
        portfolioItems,
        portfolios,
        orders
      }
    }) => ({ portfolioItems, portfolios, orders })
  );

  const { platforms } = useSelector(
    ({
      catalogReducer: {
        platforms
      }
    }) => ({ platforms })
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    Promise.all([ dispatch(fetchPortfolioItems()), dispatch(fetchPortfolios(), dispatch(fetchPlatforms()), dispatch(fetchOrders())) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const catalogInfo = () => {
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Spinner isSVG />
        </Section>
      );
    }
    else {
      return (
        <Stack>
          <StackItem>
            <Text>
              { intl.formatMessage(messages.catalogCardDescription) }
            </Text>
          </StackItem>
          <StackItem>
            <Stack>
              <StackItem>
                { portfolioItems?.meta?.count } { intl.formatMessage(messages.products) }
              </StackItem>
            </Stack>
          </StackItem>
          <StackItem>
            { portfolios?.meta?.count } { intl.formatMessage(messages.portfolios) }
          </StackItem>
          <StackItem>
            { platforms?.meta?.count } { intl.formatMessage(messages.platforms) }
          </StackItem>
        </Stack>
      );
    }
  };

  const catalogFeatured = () => {
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Spinner isSVG />
        </Section>
      );
    }
    else {
      return (
        <Flex>
          <FlexItem>
            <Stack>
              <StackItem>
                <Text>
                  { intl.formatMessage(messages.catalogCardDescription) }
                </Text>
              </StackItem>
              <StackItem>
                <Stack>
                  <StackItem>
                    { portfolioItems?.meta?.count } { intl.formatMessage(messages.products) }
                  </StackItem>
                </Stack>
              </StackItem>
              <StackItem>
                { portfolios?.meta?.count } { intl.formatMessage(messages.portfolios) }
              </StackItem>
              <StackItem>
                { platforms?.meta?.count } { intl.formatMessage(messages.platforms) }
              </StackItem>
            </Stack>
          </FlexItem>
          <FlexItem/>
        </Flex>
      );
    }
  };

  const catalogOrders = () => {
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Spinner isSVG />
        </Section>
      );
    }
    else {
      return (
        <Stack>
          <StackItem>
            <Text>
              { intl.formatMessage(messages.latestOrderTitle) }
              <Label>  { orders?.meta?.count } </Label>
            </Text>
          </StackItem>
          <StackItem>
            { 'Order 1' }
          </StackItem>
          <StackItem>
            { 'Order 2' }
          </StackItem>
        </Stack>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.catalogTitle) }
        </CardTitle>
        <CardBody>
          <Grid hasGutter>
            <GridItem span={ 4 }>
              <Flex>
                <FlexItem>
                  <Card>
                    { catalogInfo() }
                  </Card>
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={ 4 }>
              <Card>
                { catalogFeatured() }
              </Card>
            </GridItem>
            <GridItem span={ 4 }>
              { catalogOrders() }
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CatalogCard;
