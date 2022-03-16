import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { MemoryRouter } from 'react-router-dom';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import hubReducer, { hubInitialState } from '../../../redux/reducers/hub-reducer';
import HubCard from '../../../components/automation-hub/hub-card';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { applyReducerHash, ReducerRegistry } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { defaultSettings } from '../../../helpers/shared/pagination';
import { mockApi } from '../../../helpers/shared/__mocks__/user-login';
import { AUTOMATION_HUB_API_BASE, AUTOMATION_HUB_BASE, AUTOMATION_HUB_UI_API_BASE } from '../../../utilities/constants';
import * as contentCounts from '../../../components/automation-hub/content-counts';

describe('<HubCard />', () => {
  let initialProps;
  let initialState;
  const middlewares = [thunk, promiseMiddleware, notificationsMiddleware()];
  let mockStore;

  const ComponentWrapper = ({ store, initialEntries = [ '/ansible-dashboard' ], children }) => (
    <Provider store={ store } >
      <MemoryRouter initialEntries={ initialEntries }>
        <IntlProvider locale="en">
          { children }
        </IntlProvider>
      </MemoryRouter>
    </Provider>
  );

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
      hubReducer: { ...hubInitialState, isLoading: false }
    };
  });

  it('should render correctly', async ()=> {
    const store = mockStore(initialState);
    const registry = new ReducerRegistry({}, [ thunk, promiseMiddleware ]);
    registry.register({ hubReducer: applyReducerHash(hubReducer, hubInitialState) });

    const { asFragment } = render(<ComponentWrapper store={ store }><HubCard { ...initialProps } /></ComponentWrapper>);

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly in loading state', async () => {
    const store = mockStore(initialState);

    const { asFragment } = render(<ComponentWrapper store={ store }><HubCard { ...initialProps } isLoading={ true }/></ComponentWrapper>);
    expect(asFragment()).toMatchSnapshot();

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());
  });

  it('should render the stats for the featured collection', async() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2021, 1, 1)).valueOf());
    const spyHubCounts = jest.spyOn(contentCounts, 'contentCounts');
    const collectionData = [
      {
        id: '101',
        namespace: {
          id: '1',
          name: 'Test collection',
          company: 'A company'
        },
        latest_version: {
          metadata: {
            contents: [
              {
                name: 'Content 1',
                content_type: 'module'
              },
              {
                name: 'Content 2 - to skip',
                content_type: 'doc_fragments'
              },
              {
                name: 'Content 3 - to skip',
                content_type: 'module_utils'
              },
              {
                name: 'Content 4',
                content_type: 'module'
              },
              {
                name: 'Content 5',
                content_type: 'module'
              },
              {
                name: 'Content 6',
                content_type: 'role'
              },
              {
                name: 'Content 7',
                content_type: 'role'
              },
              {
                name: 'Content 8',
                content_type: 'any'
              },
              {
                name: 'Content 9',
                content_type: 'plugin'
              },
              {
                name: 'Content 10',
                content_type: 'plugin type'
              },
              {
                name: 'Content 11',
                content_type: 'foo'
              }
            ]
          }
        }
      }];
    const hubState = { isLoading: false,
      isHubAvailable: true,
      isError: false,
      collection: {
        data: collectionData,
        meta: { count: 1 }
      },
      collections: {
        data: collectionData,
        meta: { count: 1 }
      },
      partners: {
        data: [],
        meta: { ...defaultSettings }
      },
      syncCollections: {
        data: [],
        meta: { ...defaultSettings }
      }};
    const featuredState = {
      i18nReducer: {
        formatMessage: ({ defaultMessage }) => defaultMessage
      },
      hubReducer: { ...hubState }
    };
    mockApi
    .onGet(`${AUTOMATION_HUB_API_BASE}/collections?deprecated=false&&limit=31`)
    .replyOnce(200, { data: [collectionData], meta: { count: 1 }});
    mockApi
    .onGet(`${AUTOMATION_HUB_UI_API_BASE}/repo/published/?deprecated=false&offset=0&limit=1`)
    .replyOnce(200, { data: collectionData, meta: { count: 1 }});
    mockApi
    .onGet(`${AUTOMATION_HUB_BASE}/content/undefined-synclist/v3/collections?limit=1&deprecated=false`)
    .replyOnce(200, { data: collectionData, meta: { count: 1 }});
    mockApi
    .onGet(`${AUTOMATION_HUB_API_BASE}/namespaces?limit=1`)
    .replyOnce(200, { data: [], meta: {}});
    const store = mockStore(featuredState);

    render(<ComponentWrapper store={ store }><HubCard { ...initialProps } isLoading={ false }/></ComponentWrapper>);

    await waitFor(() => expect(() => screen.getByLabelText('Contents')).toThrow());

    expect(spyHubCounts).toHaveBeenCalled();
    expect(spyHubCounts).toHaveReturnedWith(
      { contents: { module: 3, plugin: 4, role: 2 }, total_count: 9 });
  });
});
