import * as ActionTypes from '../action-types';
import * as HubHelper from '../../helpers/automation-hub/hub-helper';

const setHubAvailability = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_HUB_AVAILABILITY,
    payload: value
  });
};

const setHubError = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_HUB_ERROR,
    payload: value
  });
};

export const fetchCollections = () => (dispatch) => {
  const load = HubHelper.getCollections().catch((err) => {
    if (err.status === 404) {
      setHubAvailability(dispatch, false);
    }
    else {
      setHubError(dispatch, true);
    }
  });
  return dispatch({
    type: ActionTypes.FETCH_COLLECTIONS,
    payload: load
  });
};

export const fetchCollection = (offset) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_COLLECTION,
    payload: HubHelper.getCollection(offset).catch((err) => {
      if (err.status === 404) {
        setHubAvailability(dispatch, false);
      }
      else {
        setHubError(dispatch, true);
      }
    })
  });
};

export const fetchPartners = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PARTNERS,
    payload: HubHelper.getPartners().catch((err) => {
      if (err.status === 404) {
        setHubAvailability(dispatch, false);
      }
      else {
        setHubError(dispatch, true);
      }
    })
  });
};

export const fetchSyncCollections = (account) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_SYNC_COLLECTIONS,
    payload: HubHelper.getSyncCollections(account).catch((err) => {
      if (err.status === 404) {
        setHubAvailability(dispatch, false);
      }
      else {
        setHubError(dispatch, true);
      }
    })
  });
};

