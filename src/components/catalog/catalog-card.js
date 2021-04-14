import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
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
        <Card>
          <GridItem md={ 4 } lg={ 3 }>
            <Text>
                Collect and distribute automation content, govern content by approval processes and assure sin-off by assigned groups.
            </Text>
          </GridItem>
          <GridItem md={ 8 } lg={ 9 }>
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
        </Card>
      );
    }
  };

  return (
    <Fragment>
      <Title headingLevel={ 'h3' }>
        { intl.formatMessage(messages.catalogTitle) }
      </Title>
      <Section type="content">
        <Grid hasGutter>
          { renderCatalogCards() }
        </Grid>
      </Section>
    </Fragment>
  );
};

export default CatalogCard;
