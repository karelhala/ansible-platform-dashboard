import React from 'react';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { MemoryRouter } from 'react-router-dom';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import catalogReducer, { catalogInitialState } from '../../../redux/reducers/catalog-reducer';
import AnalyticsCard from '../../../components/catalog/catalog-card';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { shallowToJson } from 'enzyme-to-json';
import { applyReducerHash, ReducerRegistry } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import CatalogCard from '../../../components/catalog/catalog-card';

const ComponentWrapper = ({ store, initialEntries = [ '/ansible-dashboard' ], children }) => (
  <IntlProvider locale="en">
    <Provider store={ store } >
      <MemoryRouter initialEntries={ initialEntries }>
        <IntlProvider locale="en">
          { children }
        </IntlProvider>
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
      analyticsReducer: { ...catalogInitialState, isLoading: false }
    };
  });

  it('should render correctly', async ()=> {
    const store = mockStore(initialState);
    const registry = new ReducerRegistry({}, [ thunk, promiseMiddleware ]);
    registry.register({ analyticsReducer: applyReducerHash(catalogReducer, catalogInitialState) });

    let wrapper;
    await act(async () => {
      wrapper = shallow(<ComponentWrapper store={ store }><CatalogCard { ...initialProps } /></ComponentWrapper>);
    });
    wrapper.update();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly in loading state', () => {
    const store = mockStore(initialState);
    let wrapper;
    shallow(<ComponentWrapper store={ store }><CatalogCard { ...initialProps } isLoading={ true } /></ComponentWrapper>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
