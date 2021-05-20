import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle, Divider,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Grid,
  GridItem, Label, Level, LevelItem,
  Spinner,
  Stack,
  StackItem,
  Text, TextContent, TextVariants,
  Title, Popover, Tooltip
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
import ErrorCard from '../shared/error-card';
import OutlinedQuestionCircleIcon from '@patternfly/react-icons/dist/js/icons/outlined-question-circle-icon';

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

  const { isError, collection, collections, partners } = useSelector(
    ({
      hubReducer: {
        isError,
        collection,
        collections,
        partners
      }
    }) => ({ isError, collection, collections, partners })
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
    if (collections?.meta?.count > 0) {
      const d = new Date();
      const day = d.getDate();
      const count = collections?.meta?.count;
      stateDispatch({ type: 'setFetching', payload: true });
      dispatch(fetchCollection(count <= day ? count : day - 1)).then(() =>
        stateDispatch({ type: 'setFetching', payload: false }));
    }
  }, [ collections ]);

  const renderHubInfo = () => (
    <React.Fragment>
      <Text>
        { intl.formatMessage(messages.hubCardDescription) }
      </Text>
      <br/>

      <DescriptionList isHorizontal isAutoFit autoFitModifier={ { md: '100px', lg: '150px', xl: '200px', '2xl': '300px' } }>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { partners?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Button
              component='a'
              variant='link'
              href={ `${release}ansible/automation-hub/partners` }>
              { intl.formatMessage(messages.partners) }
            </Button>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { collections?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription>
            <Button
              component='a'
              variant='link'
              href={ `${release}ansible/automation-hub` }>
              { intl.formatMessage(messages.collections) }
            </Button>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            { collections?.meta?.count }
          </DescriptionListTerm>
          <DescriptionListDescription className="padded_text">
            <Level hasGutter>
              <LevelItem>
                <div>
                  { intl.formatMessage(messages.syncCollections) }
                </div>
              </LevelItem>
              <LevelItem>
                <Popover
                  headerContent={ <div>{ intl.formatMessage(messages.syncCollections) }</div> }
                  bodyContent={ <div>{ intl.formatMessage(messages.syncCollectionsTooltip) }</div> }
                >
                  <div>
                    <OutlinedQuestionCircleIcon />
                  </div>
                </Popover>
              </LevelItem>
            </Level>
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </React.Fragment>
  );

  const renderHubFeaturedCollection = () => {
    const featuredCollection = collection?.data ? collection?.data[0] : null;
    const content = featuredCollection ? contentCounts(
      featuredCollection.latest_version?.metadata?.contents
    ) : undefined;
    return (
      <Fragment>
        <Title headingLevel="h4">
          { intl.formatMessage(messages.hubCardFeaturedCollectionTitle) }
        </Title>
        <br/>
        {  featuredCollection &&
        <Flex direction={ { default: 'column' } }>
          <FlexItem>
            <Level hasGutter="xl">
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
          </FlexItem>
          <FlexItem>
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
            <Grid hasGutter="md" >
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
      <Stack hasGutter="lg">
        <StackItem>
          <Title headingLevel="h4">
            { intl.formatMessage(messages.hubCardCertifiedCollectionTitle) }
          </Title>
        </StackItem>
        <StackItem isFilled>
          <Text>
            { intl.formatMessage(messages.hubCardCertifiedCollectionDescription) }
          </Text>
        </StackItem>
        <StackItem>
          <Bullseye>
            <Button
              component='a'
              variant='link'
              target="_blank"
              rel="noopener noreferrer"
              href={ `https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html
              /managing_red_hat_certified_and_ansible_galaxy_collections_in_automation_hub/index` }>
              { intl.formatMessage(messages.learnMoreButton) }&nbsp;
              <ExternalLinkAltIcon />
            </Button>
          </Bullseye>
        </StackItem>
      </Stack>);
  };

  const renderHubCards = () => {
    if (isError) {
      return <ErrorCard/>;
    }

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
        <Flex className="automation-hub_card" >
          <FlexItem>
            { renderHubInfo() }
          </FlexItem>
          <Divider/>
          <FlexItem>
            { renderHubFeaturedCollection() }
          </FlexItem>
          <Divider/>
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
        <CardTitle>
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
