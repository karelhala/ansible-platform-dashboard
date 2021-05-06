import * as ActionTypes from '../action-types';
import * as HubHelper from '../../helpers/automation-hub/hub-helper';

export const fetchCollections = () => (dispatch) => {
  const load = HubHelper.getCollections();
  return dispatch({
    type: ActionTypes.FETCH_COLLECTIONS,
    payload: load
  });
};

export const fetchCollection = (offset) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_COLLECTION,
    payload: HubHelper.getCollection(offset)
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

export const setHubAvailability = (value = true) => (dispatch) => {
  return dispatch({
    type: ActionTypes.SET_HUB_AVAILABILITY,
    payload: value
  });
};

export const setHubError = (value = true) => (dispatch) => {
  return dispatch({
    type: ActionTypes.SET_HUB_ERROR,
    payload: value
  });
};
