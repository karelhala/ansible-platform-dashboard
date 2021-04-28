import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Badge,
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle, Divider,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Grid,
  GridItem, Label,
  Spinner,
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
import { release } from '../../utilities/app-history';
import { CATALOG_API_BASE } from '../../utilities/constants';
import CardIcon from '../shared/card-icon';

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
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { portfolioItems?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Button
              component='a'
              variant='link'
              href={ `${release}ansible/catalog/portfolio-items` }>
              { intl.formatMessage(messages.products) }
            </Button>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { portfolios?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Button
              component='a'
              variant='link'
              href={ `${release}ansible/catalog` }>
              { intl.formatMessage(messages.portfolios) }
            </Button>
          </DescriptionListDescription>
        </DescriptionListGroup>
        { permissions &&
        <Fragment>
          <DescriptionListGroup>
            <DescriptionListTerm>
              { platforms?.meta?.count }
            </DescriptionListTerm>
            <DescriptionListDescription>
              <Button variant='link'>
                { intl.formatMessage(messages.platforms) }
              </Button>
            </DescriptionListDescription>
          </DescriptionListGroup>
        </Fragment> }
      </DescriptionList>
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
              <CardIcon
                height={ 40 }
                src={ `${CATALOG_API_BASE}/portfolio_items/${featuredProduct.id}/icon` }
              />
            </FlexItem>
            <FlexItem>
              <TextContent component={ TextVariants.p }>
                { featuredProduct?.name }
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
    console.log('Debug - orders count', orders?.meta?.count);
    return (
      <Flex direction={ { default: 'column' } }>
        <FlexItem>
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
        </FlexItem>
        <FlexItem>
          <Flex direction={ { default: 'column' } }>
            <FlexItem>
              <Grid hasGutter="md">
                <GridItem span={ 2 }>
                  { orders.data[0]?.id }
                </GridItem>
                <GridItem span={ 6 }>
                  { orders.data[0]?.orderItems[0]?.name }
                </GridItem>
                <GridItem span={ 4 }>
                  <Label>
                    { orders.data[0]?.state }
                  </Label>
                </GridItem>
              </Grid>
            </FlexItem>
          </Flex>
        </FlexItem>
        <Flex direction={ { default: 'column' } }>
          <FlexItem>
            <Grid hasGutter="md">
              <GridItem span={ 2 }>
                { orders.data[1]?.id }
              </GridItem>
              <GridItem span={ 6 }>
                { orders.data[1]?.orderItems[0]?.name || `Order ${orders?.data[1]?.id}` }
              </GridItem>
              <GridItem span={ 4 }>
                <Label>
                  { orders.data[1]?.state }
                </Label>
              </GridItem>
            </Grid>
          </FlexItem>
        </Flex>
        <Flex direction={ { default: 'column' } } alignSelf={ { default: 'alignSelfFlexEnd' } }>
          <FlexItem>
            <Bullseye>
              <Button
                component='a'
                variant='link'
                href={ `${release}ansible/catalog/orders` }>
                { intl.formatMessage(messages.viewMore) }&nbsp;
              </Button>
            </Bullseye>
          </FlexItem>
        </Flex>
      </Flex>);
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
        <Flex className="automation-hub_card" >
          <FlexItem>
            { renderCatalogInfo() }
          </FlexItem>
          <Divider/>
          <FlexItem>
            { renderCatalogFeaturedProduct() }
          </FlexItem>
          <Divider/>
          <FlexItem>
            { renderCatalogOther() }
          </FlexItem>
        </Flex>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle>
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
