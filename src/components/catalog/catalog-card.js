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
  GridItem, Level, LevelItem,
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
  console.log('Debug - products, platforms, portfolios, orders', portfolioItems, platforms, portfolios, orders);

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
    return (
      <Fragment>
        <Title headingLevel="h4">
          { intl.formatMessage(messages.catalogCardFeaturedProduct) }
        </Title>
        <br/>
        {  featuredProduct &&
          <Flex direction={ { default: 'column' } }>
            <FlexItem>
              <Level hasGutter="md">
                <LevelItem>
                  <Logo
                    alt={ featuredProduct?.name }
                    image={ featuredProduct?.icon }
                    size='50px'
                  />
                </LevelItem>
              </Level>
              <TextContent>
                <Text component={ TextVariants.small }>Provided by { featuredProduct?.owner
                || featuredProduct?.name }</Text>
              </TextContent>
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
    return (
      <Stack hasGutter="lg" style={ { minHeight: '250px' } }>
        <StackItem>
          <Level>
            <LevelItem>
              <Title headingLevel="h4">
                { intl.formatMessage(messages.catalogCardLatestOrdersTitle) }
              </Title>
            </LevelItem>
            <LevelItem>
              <Badge>{ orders?.metadata?.count }</Badge>
            </LevelItem>
          </Level>
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
