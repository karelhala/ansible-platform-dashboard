import {
  FETCH_COLLECTION,
  FETCH_COLLECTIONS,
  FETCH_PARTNERS,
  FETCH_SYNC_COLLECTIONS,
  SET_HUB_LOADING_STATE } from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';
// Initial State
export const hubInitialState = {
  isLoading: false,
  collection: {},
  collections: {
    data: [],
    meta: { ...defaultSettings }
  },
  partners: {
    data: [],
    meta: { ...defaultSettings }
  },
  syncCollections: {
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

const setCollection = (state, { payload }) => ({
  ...state,
  collection: payload
});

const setPartners = (state, { payload }) => ({
  ...state,
  partners: payload
});

const setSyncCollections = (state, { payload }) => ({
  ...state,
  syncCollections: payload
});

export default {
  [SET_HUB_LOADING_STATE]: setLoadingState,
  [`${FETCH_COLLECTION}_PENDING`]: setLoadingState,
  [`${FETCH_COLLECTION}_FULFILLED`]: setCollection,
  [`${FETCH_COLLECTIONS}_FULFILLED`]: setCollections,
  [`${FETCH_COLLECTIONS}_PENDING`]: setLoadingState,
  [`${FETCH_PARTNERS}_PENDING`]: setLoadingState,
  [`${FETCH_PARTNERS}_FULFILLED`]: setPartners,
  [`${FETCH_SYNC_COLLECTIONS}_PENDING`]: setLoadingState,
  [`${FETCH_SYNC_COLLECTIONS}_FULFILLED`]: setSyncCollections,
  [`${FETCH_PARTNERS}_PENDING`]: setLoadingState
};
