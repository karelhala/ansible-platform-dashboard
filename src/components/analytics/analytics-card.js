import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardTitle, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchClusters, fetchWarningNotifications, fetchErrorNotifications } from '../../redux/actions/analytics-actions';

const initialState = {
  isFetching: true
};

const analyticsState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const AnalyticsCard = () => {
  const [{ isFetching }, stateDispatch ] = useReducer(analyticsState, initialState);

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
        <Grid>
          <GridItem>
            <Text>
              { intl.formatMessage(messages.catalogCardDescription) }
            </Text>
          </GridItem>
          <GridItem>
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
        </Grid>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.analyticsTitle) }
        </CardTitle>
        <Section type="content">
          <Grid hasGutter>
            { renderAnalyticsCards() }
          </Grid>
        </Section>
      </Card>
    </Fragment>
  );
};

export default AnalyticsCard;
