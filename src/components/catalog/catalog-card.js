import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Badge,
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle, Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem, Label, Level, LevelItem,
  Spinner,
  Stack,
  StackItem,
  Text, TextContent, TextVariants,
  Title
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import {
  fetchOrders, fetchPlatforms,
  fetchPortfolioItems,
  fetchPortfolios
} from '../../redux/actions/catalog-actions';
import UserContext from '../../user-context';
import { Logo } from '../automation-hub/logo';
import { release } from '../../utilities/app-history';
import { CATALOG_API_BASE } from '../../utilities/constants';
import DefaultLogo from '../../images/default-logo.svg';

const initialState = {
  isFetching: true
};

const catalogState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const CatalogCard = () => {
  const [{ isFetching }, stateDispatch ] = useReducer(catalogState, initialState);

  const { portfolioItems, portfolios, platforms, orders } = useSelector(
    ({
      catalogReducer: {
        portfolioItems,
        portfolios,
        platforms,
        orders
      }
    }) => ({ portfolioItems, portfolios, platforms, orders })
  );

  const {
    permissions
  } = useContext(UserContext);

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    const promiseList = [ fetchPortfolios, fetchPortfolioItems, fetchOrders ];
    if (permissions) {
      promiseList.push(fetchPlatforms);
    }

    return Promise.all(promiseList.map(fn => dispatch(fn()))).then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  console.log('Debug - permissions', permissions);
  console.log('Debug - products', portfolioItems);
  console.log('Debug - platforms', platforms);
  console.log('Debug - portfolios', portfolios);
  console.log('Debug - orders', orders);

  const renderCatalogInfo = () => (
    <React.Fragment>
      <Text>
        { intl.formatMessage(messages.catalogCardDescription) }
      </Text>
      <br/>
      <Grid hasGutter="md">
        <GridItem span="2">
          <TextContent>
            <Text component={ TextVariants.h1 }>
              { portfolioItems?.meta?.count }
            </Text>
          </TextContent>
        </GridItem>
        <GridItem span="10">
          <Button
            isLarge
            className="pf-u-p-0"
            component='a'
            variant='link'
            href={ `${release}ansible/catalog/portfolio-items` }>
            { intl.formatMessage(messages.products) }
          </Button>
        </GridItem>
        <GridItem span="2">
          <TextContent>
            <Text component={ TextVariants.h1 }>
              { portfolios?.meta?.count }
            </Text>
          </TextContent>
        </GridItem>
        <GridItem span="10">
          <Button
            isLarge
            className="pf-u-p-0"
            component='a'
            variant='link'
            href={ `${release}ansible/catalog` }>
            { intl.formatMessage(messages.portfolios) }
          </Button>
        </GridItem>
        { permissions &&
        <Fragment>
          <GridItem span="2">
            <TextContent>
              <Text component={ TextVariants.h1 }>
                { platforms?.meta?.count }
              </Text>
            </TextContent>
          </GridItem>
          <GridItem span="10">
            <Button
              className="pf-u-p-0"
              isLarge
              variant='link'
            >
              { intl.formatMessage(messages.platforms) }
            </Button>
          </GridItem>
        </Fragment> }
      </Grid>
    </React.Fragment>
  );

  const renderCatalogFeaturedProduct = () => {
    const featuredProduct = portfolioItems?.data ? portfolioItems?.data[0] : null;
    console.log('Debug - featuredProduct', featuredProduct);
    return (
      <Fragment>
        <Title headingLevel="h4">
          { intl.formatMessage(messages.catalogCardFeaturedProduct) }
        </Title>
        <br/>
        {  featuredProduct &&
          <Flex direction={ { default: 'column' } }>
            <FlexItem>
              <Stack hasGutter="md">
                <StackItem>
                  <img
                    style={ { objectFit: 'contain', maxHeight: 50 } }
                    src={ `${CATALOG_API_BASE}/portfolio_items/${featuredProduct.id}/icon` || DefaultLogo }
                  />
                </StackItem>
                <StackItem>
                  <TextContent component={ TextVariants.p }>
                    { featuredProduct?.name }
                  </TextContent>
                </StackItem>
              </Stack>
            </FlexItem>
            <FlexItem>
              <TextContent>
                <Text component={ TextVariants.p }>
                  { featuredProduct?.description }
                </Text>
              </TextContent>
            </FlexItem>
          </Flex> }
      </Fragment>);
  };

  const renderCatalogOther = () => {
    console.log('Debug - orders count', orders?.meta?.count);
    return (
      <Stack hasGutter="lg" style={ { minHeight: '250px' } }>
        <StackItem>
          <Flex>
            <FlexItem>
              <Title headingLevel="h4">
                { intl.formatMessage(messages.catalogCardLatestOrdersTitle) }
              </Title>
            </FlexItem>
            <FlexItem>
              <Badge>{ orders?.meta?.count }</Badge>
            </FlexItem>
          </Flex>
        </StackItem>
        <StackItem>
          <Level>
            <LevelItem>
              { orders.data[0]?.orderItems[0]?.id }
            </LevelItem>
            <LevelItem>
              { orders.data[0]?.orderItems[0]?.name }
            </LevelItem>
            <LevelItem>
              <Label>
                { orders.data[0]?.orderItems[0]?.state }
              </Label>
            </LevelItem>
          </Level>
        </StackItem>
        <StackItem>
          { orders.data[1]?.orderItems[0]?.name }
        </StackItem>
        <StackItem>
          <Flex justifyContent={ { default: 'justifyContentSpaceBetween' } }>
            <FlexItem>
              <Button
                component='a'
                variant='link'
                href={ `${release}ansible/catalog/orders` }>
                { intl.formatMessage(messages.viewMore) }&nbsp;
              </Button>
            </FlexItem>
          </Flex>
        </StackItem>
      </Stack>);
  };

  const renderCatalogCards = () => {
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Bullseye>
            <Spinner isSVG />
          </Bullseye>
        </Section>
      );
    }
    else {
      return (
        <Flex flex={ { default: 'flex_1' } }>
          <FlexItem  style={ { width: '30%' } }>
            { renderCatalogInfo() }
          </FlexItem>
          <Divider isVertical/>
          <FlexItem  style={ { width: '30%' } }>
            { renderCatalogFeaturedProduct() }
          </FlexItem>
          <Divider isVertical/>
          <FlexItem style={ { width: '30%' } }>
            { renderCatalogOther() }
          </FlexItem>
        </Flex>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          <Title headingLevel="h3">
            { intl.formatMessage(messages.catalogTitle) }
          </Title>
        </CardTitle>
        <CardBody>
          { renderCatalogCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CatalogCard;
