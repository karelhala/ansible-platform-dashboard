import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardTitle, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchPortfolioItems, fetchPortfolios } from '../../redux/actions/catalog-actions';

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

  const { portfolioItems, portfolios } = useSelector(
    ({
      catalogReducer: {
        portfolioItems,
        portfolios
      }
    }) => ({ portfolioItems, portfolios })
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
    Promise.all([ dispatch(fetchPortfolioItems()), dispatch(fetchPortfolios()) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderCatalogCards = () => {
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Spinner isSVG />
        </Section>
      );
    }
    else {
      return (
        <Grid>
          <GridItem>
            <Text>
              { intl.formatMessage(messages.catalogCardDescription) }
            </Text>
          </GridItem>
          <GridItem>
            <Stack>
              <StackItem>
                { portfolioItems?.meta?.count } Products
              </StackItem>
            </Stack>
            <StackItem>
              { portfolios?.meta?.count } Portfolios
            </StackItem>
            <StackItem>
              { platforms?.meta?.count } Platforms
            </StackItem>
          </GridItem>
        </Grid>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.catalogTitle) }
        </CardTitle>
        <Section type="content">
          <Grid hasGutter>
            { renderCatalogCards() }
          </Grid>
        </Section>
      </Card>
    </Fragment>
  );
};

export default CatalogCard;
