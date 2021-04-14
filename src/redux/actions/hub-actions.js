import * as ActionTypes from '../action-types';
import * as HubHelper from '../../helpers/automation-hub/hub-helper';

export const fetchCollections = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_COLLECTIONS,
    payload: HubHelper.getCollections()
  });
};

export const fetchPartners = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PARTNERS,
    payload: HubHelper.getPartners()
  });
};

