import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { MemoryRouter } from 'react-router-dom';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import catalogReducer, { catalogInitialState } from '../../../redux/reducers/catalog-reducer';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { applyReducerHash, ReducerRegistry } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import CatalogCard from '../../../components/catalog/catalog-card';
import UserContext from '../../../user-context';
import '../../../helpers/shared/__mocks__/user-login';

const ComponentWrapper = ({ store, initialEntries = [ '/ansible-dashboard' ], children }) => (
  <IntlProvider locale="en">
    <Provider store={ store } >
      <MemoryRouter initialEntries={ initialEntries }>
        <UserContext.Provider
          value={ { permissions: []} }
        >
          { children }
        </UserContext.Provider>
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
      analyticsReducer: { ...catalogInitialState, isLoading: false },
      catalogReducer: { ...catalogInitialState, isLoading: false }
    };
  });

  it('should render correctly', async ()=> {
    const store = mockStore(initialState);
    const registry = new ReducerRegistry({}, [ thunk, promiseMiddleware ]);
    registry.register({ analyticsReducer: applyReducerHash(catalogReducer, catalogInitialState) });

    const { asFragment } = render(<ComponentWrapper store={ store }><CatalogCard { ...initialProps } /></ComponentWrapper>);

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly in loading state', async () => {
    const store = mockStore(initialState);

    const { asFragment } = render(<ComponentWrapper store={ store }><CatalogCard { ...initialProps } isLoading={ true } /></ComponentWrapper>);

    expect(asFragment()).toMatchSnapshot();

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());
  });
});
