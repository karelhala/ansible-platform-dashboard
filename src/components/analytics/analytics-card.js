import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bullseye,
  Card,
  CardBody,
  CardTitle, Divider,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Label,
  Spinner,
  Text,
  Title
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchClusters, fetchErrorNotifications, fetchWarningNotifications, fetchJobsData } from '../../redux/actions/analytics-actions';
import InfoCircleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';
import WarningTriangleIcon from '@patternfly/react-icons/dist/js/icons/warning-triangle-icon';
import JobsChart from './jobs-chart';
import { release } from '../../utilities/app-history';

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

  const { clusters, errorNotifications, warningNotifications, jobsData } = useSelector(
    ({
      analyticsReducer: {
        clusters,
        errorNotifications,
        warningNotifications,
        jobsData
      }
    }) => ({ clusters, errorNotifications, warningNotifications, jobsData })
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    Promise.all([ dispatch(fetchClusters()), dispatch(fetchErrorNotifications()), dispatch(fetchWarningNotifications()), dispatch(fetchJobsData()) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderAnalyticsNotifications = () => (
    <React.Fragment>
      <Text>
        { intl.formatMessage(messages.analyticsCardDescription) }
      </Text>
      <br/>

      <DescriptionList>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { errorNotifications?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Label
              color="red"
              icon={ <InfoCircleIcon /> }
              isTruncated
              href={ `${release}ansible/automation-analytics/notifications` }
            >
              { intl.formatMessage(messages.critical) }
            </Label>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { warningNotifications?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Label
              color="orange"
              icon={ <WarningTriangleIcon /> }
              isTruncated
              href={ `${release}ansible/automation-analytics/notifications` }
            >
              { intl.formatMessage(messages.warning) }
            </Label>
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </React.Fragment>
  );

  const renderAnalyticsInfo = () => {
    return (
      <Fragment>
        <Title headingLevel="h4">
          { intl.formatMessage(messages.analyticsCardNotificationsTitle) }
        </Title>
        <br/>
      </Fragment>);
  };

  const renderAnalyticsOther = () => {
    return (<JobsChart/>);
  };

  const renderAnalyticsCards = () => {
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
        <Flex className="automation-analytics_card" >
          <FlexItem>
            { renderAnalyticsInfo() }
          </FlexItem>
          <Divider/>
          <FlexItem>
            { renderAnalyticsNotifications() }
          </FlexItem>
          <Divider/>
          <FlexItem>
            { renderAnalyticsOther() }
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
            { intl.formatMessage(messages.analyticsTitle) }
          </Title>
        </CardTitle>
        <CardBody>
          { renderAnalyticsCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AnalyticsCard;
