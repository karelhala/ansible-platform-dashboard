import promiseMiddleware from 'redux-promise-middleware';
import ReducerRegistry, {
  applyReducerHash
} from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';

import thunk from 'redux-thunk';
import catalogReducer, { catalogInitialState } from '../redux/reducers/catalog-reducer';

const getStore = (middlewares = []) => {
  console.log('Debug - middlewares', middlewares);
  const registry = new ReducerRegistry({}, [
    thunk,
    promiseMiddleware,
    notificationsMiddleware({
      errorTitleKey: [ 'errors', 'message', 'statusText' ],
      errorDescriptionKey: [
        'data.errors[0].detail',
        'data.errors',
        'data.error',
        'data.message',
        'response.body.errors',
        'data',
        'errorMessage',
        'stack'
      ]
    }),
    ...middlewares
  ]);

  registry.register({
    catalogReducer: applyReducerHash(catalogReducer, catalogInitialState),
    notifications: notificationsReducer
  });

  return registry.getStore();
};

export default getStore;
