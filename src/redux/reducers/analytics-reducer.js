import { FETCH_CLUSTERS,
  FETCH_ERROR_NOTIFICATIONS,
  FETCH_WARNING_NOTIFICATIONS,
  FETCH_JOBS,
  SET_ANALYTICS_LOADING_STATE,
  SET_ANALYTICS_AVAILABILITY,
  SET_ANALYTICS_ERROR
} from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';
// Initial State
export const analyticsInitialState = {
  isLoading: false,
  isAvailable: true,
  isError: false,
  clusters: {
    data: [],
    meta: { ...defaultSettings }
  },
  errorNotifications: {
    notifications: [],
    meta: { ...defaultSettings }
  },
  warningNotifications: {
    notifications: [],
    meta: { ...defaultSettings }
  },
  jobsData: {
    data: [],
    meta: { ...defaultSettings }
  }
};

const setLoadingState = (state, payload = true) => ({
  ...state,
  isLoading: payload
});

const setAvailabilityState = (state, { payload = true }) => ({
  ...state,
  isAvailable: payload
});

const setErrorState = (state, { payload = true }) => ({
  ...state,
  isError: payload
});

const setClusters = (state, payload) => ({
  ...state,
  clusters: payload
});

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
  [SET_ANALYTICS_AVAILABILITY]: setAvailabilityState,
  [SET_ANALYTICS_ERROR]: setErrorState,
  [`${FETCH_CLUSTERS}_FULFILLED`]: setClusters,
  [`${FETCH_CLUSTERS}_PENDING`]: setLoadingState,
  [`${FETCH_ERROR_NOTIFICATIONS}_FULFILLED`]: setErrorNotifications,
  [`${FETCH_ERROR_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_WARNING_NOTIFICATIONS}_FULFILLED`]: setWarningNotifications,
  [`${FETCH_WARNING_NOTIFICATIONS}_PENDING`]: setLoadingState,
  [`${FETCH_JOBS}_FULFILLED`]: setJobsData,
  [`${FETCH_JOBS}_PENDING`]: setLoadingState
};
