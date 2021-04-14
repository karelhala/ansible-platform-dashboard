import { FETCH_COLLECTIONS,
  FETCH_PARTNERS,
  SET_HUB_LOADING_STATE } from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';
// Initial State
export const hubInitialState = {
  isLoading: false,
  collections: {
    data: [],
    meta: { ...defaultSettings }
  },
  partners: {
    data: [],
    meta: { ...defaultSettings }
  }
};

const setLoadingState = (state, { payload = true }) => ({
  ...state,
  isLoading: payload
});

const setCollections = (state, { payload }) => ({
  ...state,
  collections: payload
});

const setPartners = (state, { payload }) => ({
  ...state,
  partners: payload
});

export default {
  [SET_HUB_LOADING_STATE]: setLoadingState,
  [`${FETCH_COLLECTIONS}_FULFILLED`]: setCollections,
  [`${FETCH_COLLECTIONS}_PENDING`]: setLoadingState,
  [`${FETCH_PARTNERS}_FULFILLED`]: setPartners,
  [`${FETCH_PARTNERS}_PENDING`]: setLoadingState
};
