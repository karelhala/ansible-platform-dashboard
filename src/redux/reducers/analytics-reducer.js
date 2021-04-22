import { FETCH_CLUSTERS,
  FETCH_ERROR_NOTIFICATIONS,
  FETCH_WARNING_NOTIFICATIONS,
  FETCH_JOBS,
  SET_ANALYTICS_LOADING_STATE } from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';
// Initial State
export const analyticsInitialState = {
  isLoading: false,
  clusters: {
    data: [],
    meta: { ...defaultSettings }
  },
  errorNotifications: {
    data: [],
    meta: { ...defaultSettings }
  },
  warningNotifications: {
    data: [],
    meta: { ...defaultSettings }
  },
  jobs: {
    data: [],
    meta: { ...defaultSettings }
  }
};

const setLoadingState = (state, { payload = true }) => ({
  ...state,
  isLoading: payload
});

const setClusters = (state, payload) => {
  return ({
    ...state,
    clusters: payload
  });
};

const setNotifications = (state, payload) => ({
  ...state,
  notifications: payload
});

const setJobs = (state, payload) => ({
  ...state,
  jobs: payload
});

export default {
  [SET_ANALYTICS_LOADING_STATE]: setLoadingState,
  [`${FETCH_CLUSTERS}_FULFILLED`]: setClusters(),
  [`${FETCH_CLUSTERS}_PENDING`]: setLoadingState,
  [`${FETCH_ERROR_NOTIFICATIONS}_FULFILLED`]: setNotifications(),
  [`${FETCH_ERROR_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_WARNING_NOTIFICATIONS}_FULFILLED`]: setNotifications(),
  [`${FETCH_WARNING_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_JOBS}_FULFILLED`]: setJobs(),
  [`${FETCH_JOBS}_PENDING`]: setLoadingState
};
