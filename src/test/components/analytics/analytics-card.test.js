import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { MemoryRouter } from 'react-router-dom';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import analyticsReducer, { analyticsInitialState } from '../../../redux/reducers/analytics-reducer';
import AnalyticsCard from '../../../components/analytics/analytics-card';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { applyReducerHash, ReducerRegistry } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import '../../../helpers/shared/__mocks__/user-login';

const ComponentWrapper = ({ store, initialEntries = [ '/ansible-dashboard' ], children }) => (
  <IntlProvider locale="en">
    <Provider store={ store } >
      <MemoryRouter initialEntries={ initialEntries }>
        { children }
      </MemoryRouter>
    </Provider>
  </IntlProvider>
);

describe('<AnalyticsCard />', () => {
  let initialProps;
  let initialState;
  const middlewares = [thunk, promiseMiddleware, notificationsMiddleware()];
  let mockStore;

  beforeEach(() => {
    global.insights = {
      chrome: {
        identifyApp: jest.fn(),
        init: jest.fn(),
        auth: {
          getUser: () => Promise.resolve(true)
        }
      }
    };
    initialProps = {};
    mockStore = configureStore(middlewares);
    initialState = {
      i18nReducer: {
        formatMessage: ({ defaultMessage }) => defaultMessage
      },
      analyticsReducer: { ...analyticsInitialState, isLoading: false }
    };
  });

  it('should render correctly', async ()=> {
    const store = mockStore(initialState);
    const registry = new ReducerRegistry({}, [ thunk, promiseMiddleware ]);
    registry.register({ analyticsReducer: applyReducerHash(analyticsReducer, analyticsInitialState) });

    const { asFragment } = render(<ComponentWrapper store={ store }><AnalyticsCard { ...initialProps } /></ComponentWrapper>);

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly in loading state', async () => {
    const store = mockStore(initialState);
    const { asFragment } = render(<ComponentWrapper store={ store }><AnalyticsCard { ...initialProps } isLoading={ true } /></ComponentWrapper>);
    expect(asFragment()).toMatchSnapshot();

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());
  });
});
