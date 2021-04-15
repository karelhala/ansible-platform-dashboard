import React, { Fragment, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardTitle, Grid, GridItem, Spinner, Stack, StackItem, Text, Title } from '@patternfly/react-core';
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
        <Grid>
          <GridItem>
            <Text>
              { intl.formatMessage(messages.hubCardDescription) }
            </Text>
          </GridItem>
          <GridItem>
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
        </Grid>
      );
    }
  };

  return (
    <Fragment>
      <Card className='ins-c-dashboard__card'>
        <CardTitle className="pf-u-py-sm">
          { intl.formatMessage(messages.hubTitle) }
        </CardTitle>
        <Section type="content">
          <Grid hasGutter>
            { renderHubCards() }
          </Grid>
        </Section>
      </Card>
    </Fragment>
  );
};

export default HubCard;
