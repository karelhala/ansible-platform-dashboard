import React, {Fragment, useContext, useEffect, useReducer} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, Flex, FlexItem, Grid, GridItem, Spinner, Stack, StackItem, Text } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchCollections, fetchPartners } from '../../redux/actions/hub-actions';
import UserContext from '../../user-context';

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

  const { collections, partners } = useSelector(
    ({
      hubReducer: {
        collections,
        partners
      }
    }) => ({ collections, partners })
  );

  const {
    userIdentity: {
      identity: {
        user: { account }
      }
    }
  } = useContext(UserContext);

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    Promise.all([ dispatch(fetchCollections()), dispatch(fetchPartners()), dispatch(fetchSyncCollections(account)) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderHubCards = () => {
    console.log('Debug - collections: ', collections);
    if (isFetching) {
      return (
        <Section style={ { backgroundColor: 'white', minHeight: '100%' } }>
          <Spinner isSVG />
        </Section>
      );
    }
    else {
      return (
        <Flex flex={ { default: 'flex_1' } }>
          <FlexItem>
            <Text style={ { width: '300px' } }>
              { intl.formatMessage(messages.hubCardDescription) }
            </Text>
            <Stack>
              <StackItem>
                { partners?.meta?.count } { intl.formatMessage(messages.partners) }
              </StackItem>
            </Stack>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.collections) }
            </StackItem>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.syncCollections) }
            </StackItem>
          </FlexItem>
          <FlexItem>
            <Text style={ { width: '300px' } }>
              { intl.formatMessage(messages.hubCardDescription) }
            </Text>
            <Stack>
              <StackItem>
                { partners?.meta?.count } { intl.formatMessage(messages.partners) }
              </StackItem>
            </Stack>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.collections) }
            </StackItem>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.syncCollections) }
            </StackItem>
          </FlexItem>
          <FlexItem>
            <Text style={ { width: '300px' } }>
              { intl.formatMessage(messages.hubCardDescription) }
            </Text>
            <Stack>
              <StackItem>
                { partners?.meta?.count } { intl.formatMessage(messages.partners) }
              </StackItem>
            </Stack>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.collections) }
            </StackItem>
            <StackItem>
              { collections?.meta?.count } { intl.formatMessage(messages.syncCollections) }
            </StackItem>
          </FlexItem>
        </Flex>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.hubTitle) }
        </CardTitle>
        <CardBody>
          { renderHubCards() }
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default HubCard;
