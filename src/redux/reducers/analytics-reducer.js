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
  jobsData: {
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

const setErrorNotifications = (state, payload) => ({
  ...state,
  errorNotifications: payload
});

const setWarningNotifications = (state, payload) => ({
  ...state,
  warningNotifications: payload
});

const setJobsData = (state, payload) => ({
  ...state,
  jobsData: payload
});

export default {
  [SET_ANALYTICS_LOADING_STATE]: setLoadingState,
  [`${FETCH_CLUSTERS}_FULFILLED`]: setClusters(),
  [`${FETCH_CLUSTERS}_PENDING`]: setLoadingState,
  [`${FETCH_ERROR_NOTIFICATIONS}_FULFILLED`]: setErrorNotifications(),
  [`${FETCH_ERROR_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_WARNING_NOTIFICATIONS}_FULFILLED`]: setWarningNotifications(),
  [`${FETCH_WARNING_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_JOBS}_FULFILLED`]: setJobsData(),
  [`${FETCH_JOBS}_PENDING`]: setLoadingState
};
