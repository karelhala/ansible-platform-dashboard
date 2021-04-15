import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, Spinner, Stack, StackItem, Text } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchPlatforms, fetchPortfolioItems, fetchPortfolios } from '../../redux/actions/catalog-actions';

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
    Promise.all([ dispatch(fetchPortfolioItems()), dispatch(fetchPortfolios(), dispatch(fetchPlatforms())) ])
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

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.catalogTitle) }
        </CardTitle>
        <CardBody>
          { renderCatalogCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CatalogCard;
