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
import orderStatusMapper from '../shared/order-status-mapper';
import { TimeAgo } from '../../helpers/shared/helpers';
import ErrorCard from '../shared/error-card';
import ConfigureCatalogCard from './configure-catalog_card';

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

  const { isAvailable, isError, portfolioItems, portfolios, platforms, orders } = useSelector(
    ({
      catalogReducer: {
        isAvailable,
        isError,
        portfolioItems,
        portfolios,
        platforms,
        orders
      }
    }) => ({ isAvailable, isError, portfolioItems, portfolios, platforms, orders })
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

  const orderRow = (order) => {
    return <Grid hasGutter="md">
      <GridItem span={ 2 } className="pf-u-m-0">
        <Button
          className="pf-u-p-0"
          component='a'
          variant='link'
          href={ `${release}ansible/catalog/orders/${order?.id}` }>
          { order?.id }
        </Button>
      </GridItem>
      <GridItem span={ 6 }>
        { order?.orderItems[0]?.name }
      </GridItem>
      <GridItem span={ 4 }>
        <Label { ...orderStatusMapper[order?.state] } variant="outline">
          { order?.state }
        </Label>
      </GridItem>
      <GridItem span={ 12 }>
        <TextContent>
          <Text component={ TextVariants.small }>Last updated &nbsp;
            <TimeAgo date={ order?.created_at }/>
          </Text>
        </TextContent>
      </GridItem>
    </Grid>;
  };

  const renderCatalogOther = () => {
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
              <Badge isRead>{ orders?.meta?.count }</Badge>
            </FlexItem>
          </Flex>
        </FlexItem>
        { orders?.data?.map((order) => (
          <FlexItem key={ order?.id }>
            <Flex direction={ { default: 'column' } }>
              <FlexItem>
                { orderRow(order) }
              </FlexItem>
            </Flex>
          </FlexItem>)) }
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
    );
  };

  const renderCatalogCards = () => {
    if (!isAvailable) {
      return <ConfigureCatalogCard/>;
    }

    if (isError) {
      return <ErrorCard/>;
    }
    else if (isFetching) {
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
