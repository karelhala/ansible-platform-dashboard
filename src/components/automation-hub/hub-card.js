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
  GridItem, Label, Level, LevelItem,
  Spinner,
  Stack,
  StackItem,
  Text, TextContent, TextVariants,
  Title
} from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchCollection, fetchCollections, fetchPartners, fetchSyncCollections } from '../../redux/actions/hub-actions';
import UserContext from '../../user-context';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import { contentCounts } from './content-counts';
import { Logo } from './logo';
import { release } from '../../utilities/app-history';

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

      dispatch(fetchCollection(count <= day ? count : day - 1)).then(() =>
        stateDispatch({ type: 'setFetching', payload: false }));
    }
  }, [ collections ]);

  const renderHubInfo = () => (
    <React.Fragment>
      <Text style={ { width: '350px' } }>
        { intl.formatMessage(messages.hubCardDescription) }
      </Text>
      <br/>
      <Grid hasGutter="md">
        <GridItem span="2">
          <TextContent>
            <Text component={ TextVariants.h1 }>
              { partners?.meta?.count }
            </Text>
          </TextContent>
        </GridItem>
        <GridItem span="10">
          <Button
            isLarge
            className="pf-u-p-0"
            component='a'
            variant='link'
            href={ `${release}ansible/automation-hub/partners` }>
            { intl.formatMessage(messages.partners) }
          </Button>
        </GridItem>
        <GridItem span="2">
          <TextContent>
            <Text component={ TextVariants.h1 }>
              { collections?.meta?.count }
            </Text>
          </TextContent>
        </GridItem>
        <GridItem span="10">
          <Button
            isLarge
            className="pf-u-p-0"
            component='a'
            variant='link'
            href={ `${release}ansible/automation-hub` }>
            { intl.formatMessage(messages.collections) }
          </Button>
        </GridItem>
        <GridItem span="2">
          <TextContent>
            <Text component={ TextVariants.h1 }>
              { collections?.meta?.count }
            </Text>
          </TextContent>
        </GridItem>
        <GridItem span="10">
          <Button
            className="pf-u-p-0"
            isLarge
            variant='link'
          >
            { intl.formatMessage(messages.syncCollections) }
          </Button>
        </GridItem>
      </Grid>
    </React.Fragment>
  );

  const renderHubFeaturedCollection = () => {
    const featuredCollection = collection?.data ? collection?.data[0] : null;
    const content = featuredCollection ? contentCounts(
      featuredCollection.latest_version?.metadata?.contents
    ) : undefined;
    return (
      <Fragment>
        <Title headingLevel="h4" style={ { width: '350px' } }>
          { intl.formatMessage(messages.hubCardFeaturedCollectionTitle) }
        </Title>
        <br/>
        {  featuredCollection &&
        <Flex direction={ { default: 'column' } }>
          <FlexItem style={ { width: '350px' } }>
            <Level hasGutter="md">
              <LevelItem>
                <Logo
                  alt={ featuredCollection?.namespace?.company + ' logo' }
                  image={ featuredCollection?.namespace.avatar_url }
                  size='50px'
                />
              </LevelItem>
              <LevelItem>
                <Label>Certified</Label>
              </LevelItem>
            </Level>
            <TextContent>
              <Text component={ TextVariants.small }>Provided by { featuredCollection?.namespace?.company
                  || featuredCollection?.namespace?.name }</Text>
            </TextContent>
          </FlexItem>
          <FlexItem>
            <TextContent>
              <Text component={ TextVariants.p }>
                { featuredCollection?.latest_version?.metadata?.description }
              </Text>
            </TextContent>
          </FlexItem>
          <FlexItem>
            <Grid hasGutter="md" style={ { width: '350px' } }>
              <GridItem span="4">
                { content?.modules || '0' }
              </GridItem>
              <GridItem span="4">
                { content?.roles || 0 }
              </GridItem>
              <GridItem span="4">
                { content?.plugins || 0 }
              </GridItem>
              <GridItem span="4">
                <TextContent>
                  <Text component={ TextVariants.small }>
                    { intl.formatMessage(messages.modules) }
                  </Text>
                </TextContent>
              </GridItem>
              <GridItem span="4">
                <TextContent>
                  <Text component={ TextVariants.small }>
                    { intl.formatMessage(messages.roles) }
                  </Text>
                </TextContent>
              </GridItem>
              <GridItem span="4">
                <TextContent>
                  <Text component={ TextVariants.small }>
                    { intl.formatMessage(messages.plugins) }
                  </Text>
                </TextContent>
              </GridItem>
            </Grid>
          </FlexItem>
        </Flex> }
      </Fragment>);
  };

  const renderHubOther = () => {
    return (
      <Stack hasGutter="lg" style={ { minHeight: '250px' } }>
        <StackItem>
          <Title headingLevel="h4">
            { intl.formatMessage(messages.hubCardCertifiedCollectionTitle) }
          </Title>
        </StackItem>
        <StackItem isFilled>
          <Text style={ { width: '400px' } }>
            { intl.formatMessage(messages.hubCardCertifiedCollectionDescription) }
          </Text>
        </StackItem>
        <StackItem>
          <Flex justifyContent={ { default: 'justifyContentFlexEnd' } }>
            <FlexItem>
              <Button
                component='a'
                variant='link'
                href={ `https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html
        /managing_red_hat_certified_and_ansible_galaxy_collections_in_automation_hub/index` }>
                { intl.formatMessage(messages.learnMoreButton) }&nbsp;
                <ExternalLinkAltIcon />
              </Button>
            </FlexItem>
          </Flex>
        </StackItem>
      </Stack>);
  };

  const renderHubCards = () => {
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
