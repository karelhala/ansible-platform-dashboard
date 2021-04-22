import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, Spinner, Stack, StackItem, Text } from '@patternfly/react-core';
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
        <Stack>
          <StackItem>
            <Text>
              { intl.formatMessage(messages.catalogCardDescription) }
            </Text>
          </StackItem>
          <StackItem>
            <Stack>
              <StackItem>
                { clusters?.meta?.count } { intl.formatMessage(messages.totalClusters) }
              </StackItem>
            </Stack>
          </StackItem>
          <StackItem>
            <StackItem>
              { criticalNotifications?.meta?.count } { intl.formatMessage(messages.critical) }
            </StackItem>
            <StackItem>
              { warningNotifications?.meta?.count } { intl.formatMessage(messages.warning) }
            </StackItem>
          </StackItem>
        </Stack>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.analyticsTitle) }
        </CardTitle>
        <CardBody>
          { renderAnalyticsCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AnalyticsCard;
