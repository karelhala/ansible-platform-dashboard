import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle, Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Spinner,
  Stack,
  StackItem,
  Text,
  Title
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchCollection, fetchCollections, fetchPartners, fetchSyncCollections } from '../../redux/actions/hub-actions';
import UserContext from '../../user-context';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import { FeaturedCollection } from './featured_collection';

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

const HubCard = () => {
  const [{ isFetching }, stateDispatch ] = useReducer(hubState, initialState);

  const { collection, collections, partners } = useSelector(
    ({
      hubReducer: {
        collection,
        collections,
        partners
      }
    }) => ({ collection, collections, partners })
  );

  const {
    userIdentity
  } = useContext(UserContext);

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    Promise.all([ dispatch(fetchCollections()), dispatch(fetchPartners()), dispatch(fetchSyncCollections(userIdentity?.identity?.account_number)) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    if (collections?.meta?.count > 0) {
      const d = new Date();
      const day = d.getDate();
      const count = collections?.meta?.count;

      console.log('Debug - day, length -- count:', day, count);
      dispatch(fetchCollection(count <= day ? count : day - 1)).then(() =>
        stateDispatch({ type: 'setFetching', payload: false }));
    }
  }, [ collections ]);

  const renderHubInfo = () => (
    <React.Fragment>
      <Text style={ { width: '400px' } }>
        { intl.formatMessage(messages.hubCardDescription) }
      </Text>
      <br/>
      <Grid>
        <GridItem span="2">
          { partners?.meta?.count }
        </GridItem>
        <GridItem span="10">
          { intl.formatMessage(messages.partners) }
        </GridItem>
        <GridItem span="2">
          { collections?.meta?.count }
        </GridItem>
        <GridItem span="10">
          { intl.formatMessage(messages.collections) }
        </GridItem>
        <GridItem span="2">
          { collections?.meta?.count }
        </GridItem>
        <GridItem span="10">
          { intl.formatMessage(messages.syncCollections) }
        </GridItem>
      </Grid>
    </React.Fragment>
  );

  const renderHubFeaturedCollection = () => {
    console.log('Debug - collection', collection);
    return (
      <Fragment>
        <Title headingLevel="h4" style={ { width: '400px' } }>
          { intl.formatMessage(messages.hubCardFeaturedCollectionTitle) }
        </Title>
        <br/>
        <FeaturedCollection collection={ collection?.data[0] }/>
      </Fragment>);
  };

  const renderHubOther = () => {
    return (<Fragment>
      <Title headingLevel="h4">
        { intl.formatMessage(messages.hubCardCertifiedCollectionTitle) }
      </Title>
      <br/>
      <Text style={ { width: '500px' } }>
        { intl.formatMessage(messages.hubCardCertifiedCollectionDescription) }
      </Text>
      <br/>
      <Button
        component='a'
        variant='link'
        href={ `https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html
        /managing_red_hat_certified_and_ansible_galaxy_collections_in_automation_hub/index` }>
        { intl.formatMessage(messages.learnMoreButton) }&nbsp;
        <ExternalLinkAltIcon />
      </Button>
    </Fragment>);
  };

  const renderHubCards = () => {
    console.log('Debug - collections: ', collections);
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
        <Flex flex={ { default: 'flex_1' } }>
          <FlexItem>
            { renderHubInfo() }
          </FlexItem>
          <Divider isVertical/>
          <FlexItem>
            { renderHubFeaturedCollection() }
          </FlexItem>
          <Divider isVertical/>
          <FlexItem>
            { renderHubOther() }
          </FlexItem>
        </Flex>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          <Title headingLevel="h3">
            { intl.formatMessage(messages.hubTitle) }
          </Title>
        </CardTitle>
        <CardBody>
          { renderHubCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default HubCard;
