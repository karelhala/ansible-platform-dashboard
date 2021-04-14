import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import { fetchCollections, fetchPartners } from '../../redux/actions/hub-actions';

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

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    Promise.all([ dispatch(fetchCollections()), dispatch(fetchPartners()) ])
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderHubCards = () => {
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
            Find and use content that is supported by Red Hat and our partners to deliver reassurance for the most demanding environments
            </Text>
          </GridItem>
          <GridItem md={ 8 } lg={ 9 }>
            <Stack>
              <StackItem>
                { partners?.meta?.count } Partners
              </StackItem>
            </Stack>
            <StackItem>
              { collections?.meta?.count } Collections
            </StackItem>
            <StackItem>
              { collections?.meta?.count } Collections set to sync
            </StackItem>
          </GridItem>
        </Card>
      );
    }
  };

  return (
    <Fragment>
      <Title headingLevel={ 'h3' }>
        { intl.formatMessage(messages.hubTitle) }
      </Title>
      <Section type="content">
        <Grid hasGutter>
          { renderHubCards() }
        </Grid>
      </Section>
    </Fragment>
  );
};

export default HubCard;
