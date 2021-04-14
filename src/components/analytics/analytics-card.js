import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchClusters, fetchWarningNotifications, fetchErrorNotifications } from '../../redux/actions/analytics-actions';

const initialState = {
  isFetching: true
};

const analyticsSatate = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const AnalyticsCard = () => {
  const [{ isFetching }, stateDispatch ] = useReducer(analyticsSatate, initialState);

  const { clusters, criticalNotifications, warningNotifications } = useSelector(
    ({
      analyticsReducer: {
        clusters,
        criticalNotifications,
        warningNotifications
      }
    }) => ({ clusters, criticalNotifications, warningNotifications })
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    Promise.all([ dispatch(fetchClusters()), dispatch(fetchWarningNotifications()), dispatch(fetchErrorNotifications()) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderAnalyticsCards = () => {
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
              Gain insights into your deployments through visual dashboards and organization statistics,
              calculate your return on investment and explore automation processes details.
            </Text>
          </GridItem>
          <GridItem md={ 8 } lg={ 9 }>
            <Stack>
              <StackItem>
                { clusters?.meta?.count } Total Clusters
              </StackItem>
            </Stack>
            <Stack>
              <StackItem>
                { criticalNotifications?.meta?.count } Critical
              </StackItem>
              <StackItem>
                { warningNotifications?.meta?.count } Warning
              </StackItem>
            </Stack>
          </GridItem>
        </Card>
      );
    }
  };

  return (
    <Fragment>
      <Title headingLevel={ 'h3' }>
        { intl.formatMessage(messages.AnalyticsTitle) }
      </Title>
      <Section type="content">
        <Grid hasGutter>
          { renderAnalyticsCards() }
        </Grid>
      </Section>
    </Fragment>
  );
};

export default AnalyticsCard;
