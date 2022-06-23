import React, { Fragment, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bullseye,
  Card,
  CardBody,
  CardTitle, Divider,
  DescriptionList,
  DescriptionListDescription,
  Flex,
  FlexItem,
  Label,
  Spinner,
  Text,
  Title, Button
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchClusters, fetchErrorNotifications, fetchWarningNotifications, fetchJobsData } from '../../redux/actions/analytics-actions';
import InfoCircleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';
import WarningTriangleIcon from '@patternfly/react-icons/dist/js/icons/warning-triangle-icon';
import JobsChart from './jobs-chart';
import { release } from '../../utilities/app-history';
import ConfigureAnalyticsCard from './configure-analytics-card';
import ErrorCard from '../shared/error-card';

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

  const { isAnalyticsAvailable, isError, clusters, errorNotifications, warningNotifications, jobsData } = useSelector(
    ({
      analyticsReducer: {
        isAnalyticsAvailable,
        isError,
        clusters,
        errorNotifications,
        warningNotifications,
        jobsData
      }
    }) => ({ isAnalyticsAvailable, isError, clusters, errorNotifications, warningNotifications, jobsData })
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    Promise.all([ dispatch(fetchClusters()), dispatch(fetchErrorNotifications()), dispatch(fetchWarningNotifications()), dispatch(fetchJobsData()) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderAnalyticsNotifications = () => {
    return <React.Fragment>
      <DescriptionList className="pf-c-description-list.pf-m-vertical" columnModifier={ {
        default: '2Col'
      } }>
        <Title headingLevel="h4">
          { intl.formatMessage(messages.analyticsCardNotificationsTitle) }
        </Title>
        <br/>
        <DescriptionListDescription>
          { errorNotifications?.payload?.meta?.count || 0 }
          <p />
          <Label
            className={ 'pf-m-small' }
            color="red"
            icon={ <InfoCircleIcon/> }
            isTruncated
            href={ `${release}ansible/automation-analytics/notifications?default.severity=error` }
          >
            { intl.formatMessage(messages.critical) }
          </Label>
        </DescriptionListDescription>
        <DescriptionListDescription>
          { warningNotifications?.payload?.meta?.count || 0 }
          <p />
          <Label
            color="orange"
            icon={ <WarningTriangleIcon/> }
            isTruncated
            href={ `${release}ansible/automation-analytics/notifications?default.severity=warning` }
          >
            { intl.formatMessage(messages.warning) }
          </Label>
        </DescriptionListDescription>
      </DescriptionList>
    </React.Fragment>;
  };

  const renderAnalyticsInfo = () => {
    return (
      <Fragment>
        <Flex className=" ans-l-flex ans-l-flex-automation-analytics-info">
          <FlexItem>
            <Text>
              { intl.formatMessage(messages.analyticsCardDescription) }
            </Text>
            <br/>
          </FlexItem>
          <FlexItem>
            <DescriptionList className="pf-c-description-list.pf-m-vertical" columnModifier={ {
              default: '1Col'
            } }>
              <Title headingLevel="h4">
                { intl.formatMessage(messages.clusterTitle) }
              </Title>
              <DescriptionListDescription>
                { clusters?.payload?.templates?.length || 0 }
                <br />
                <Link to={ `${release}ansible/insights/clusters` }>
                  { intl.formatMessage(messages.totalClusters) }
                </Link>
              </DescriptionListDescription>
            </DescriptionList>
          </FlexItem>
        </Flex>
      </Fragment>);
  };

  const renderAnalyticsOther = () =>
    <Fragment>
      <Title headingLevel="h4">
        { intl.formatMessage(messages.analyticsJobTitle) }
      </Title>
      <br/>
      <Flex direction={ { default: 'column' } }>
        <FlexItem className="pf-u-m-0">
          <JobsChart items={ jobsData?.payload?.items }/>
        </FlexItem>
        <FlexItem className="pf-u-m-0 pf-u-pt-0 pf-u-pb-0 pf-u-pl-lg" >
          <Bullseye>
            <Button
              component='a'
              variant='link'
              href={ `${release}ansible/insights/job-explorer` }>
              { intl.formatMessage(messages.jobsExplorer) }
            </Button>
          </Bullseye>
        </FlexItem>
      </Flex>
    </Fragment>;

  const renderAnalyticsCards = () => {
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
        <Flex direction={ { default: 'column' } }>
          <FlexItem>
            <Flex className="ans-l-flex ans-l-flex-automation-analytics-card">
              <FlexItem>
                { renderAnalyticsInfo() }
              </FlexItem>
              <Divider/>
              <FlexItem>
                { renderAnalyticsNotifications() }
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <FlexItem>
              { renderAnalyticsOther() }
            </FlexItem>
          </FlexItem>
        </Flex>
      );
    }
  };

  return (
    !isAnalyticsAvailable ?
      <ConfigureAnalyticsCard/> :
      <Fragment>
        <Card className='ans-c-card-dashboard'>
          <CardTitle>
            <Title headingLevel="h3">
              { intl.formatMessage(messages.analyticsTitle) }
            </Title>
          </CardTitle>
          <CardBody className="pf-u-pb-sm">
            { renderAnalyticsCards() }
          </CardBody>
        </Card>
      </Fragment>
  );
};

export default AnalyticsCard;
