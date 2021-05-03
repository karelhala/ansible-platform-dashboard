import * as ActionTypes from '../action-types';
import * as AnalyticsHelper from '../../helpers/analytics/analytics-helper';

export const fetchClusters = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_CLUSTERS,
    payload: AnalyticsHelper.getClusters()
  });
};

export const fetchWarningNotifications = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_WARNING_NOTIFICATIONS,
    payload: AnalyticsHelper.getNotifications('warning')
  });
};

export const fetchErrorNotifications = () => (dispatch) => {
  const load = AnalyticsHelper.getNotifications('error');
  return dispatch({
    type: ActionTypes.FETCH_ERROR_NOTIFICATIONS,
    payload: load
  });
};

export const fetchJobsData = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_JOBS,
    payload: AnalyticsHelper.getJobsData()
  });
};
