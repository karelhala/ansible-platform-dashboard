import * as ActionTypes from '../action-types';
import * as HubHelper from '../../helpers/automation-hub/hub-helper';

export const fetchCollections = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_COLLECTIONS,
    payload: HubHelper.getCollections()
  });
};

export const fetchCollection = (name, namespace) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_COLLECTION,
    payload: HubHelper.getCollection(name, namespace)
  });
};

export const fetchPartners = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PARTNERS,
    payload: HubHelper.getPartners()
  });
};

export const fetchSyncCollections = (account) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_SYNC_COLLECTIONS,
    payload: HubHelper.getSyncCollections(account)
  });
};

