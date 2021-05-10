import {
  FETCH_ORDERS,
  FETCH_PLATFORMS,
  FETCH_PORTFOLIO_ITEMS,
  FETCH_PORTFOLIOS,
  SET_CATALOG_AVAILABILITY,
  SET_CATALOG_LOADING_STATE,
  SET_CATALOG_ERROR
} from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';

// Initial State
export const catalogInitialState = {
  isLoading: false,
  orders: {
    data: [],
    meta: { ...defaultSettings }
  },
  portfolios: {
    data: [],
    meta: { ...defaultSettings }
  },
  portfolioItems: {
    data: [],
    meta: { ...defaultSettings }
  },
  platforms: {
    data: [],
    meta: { ...defaultSettings }
  },
  isCatalogAvailable: true,
  isError: false
};

const setLoadingState = (state, { payload = true }) => ({
  ...state,
  isLoading: payload
});

const setAvailabilityState = (state, { payload = true }) => ({
  ...state,
  isCatalogAvailable: payload
});

const setErrorState = (state, { payload = true }) => ({
  ...state,
  isError: payload
});

const setOrders = (state, { payload }) => ({
  ...state,
  orders: payload
});

const setPortfolios = (state, { payload }) => ({
  ...state,
  portfolios: payload
});

const setPortfolioItems = (state, { payload }) => ({
  ...state,
  portfolioItems: payload
});

const setPlatforms = (state, { payload }) => ({
  ...state,
  platforms: payload
});

export default {
  [SET_CATALOG_LOADING_STATE]: setLoadingState,
  [SET_CATALOG_AVAILABILITY]: setAvailabilityState,
  [SET_CATALOG_ERROR]: setErrorState,
  [`${FETCH_ORDERS}_FULFILLED`]: setOrders,
  [`${FETCH_ORDERS}_PENDING`]: setLoadingState,
  [`${FETCH_PORTFOLIOS}_FULFILLED`]: setPortfolios,
  [`${FETCH_PORTFOLIOS}_PENDING`]: setLoadingState,
  [`${FETCH_PORTFOLIO_ITEMS}_FULFILLED`]: setPortfolioItems,
  [`${FETCH_PORTFOLIO_ITEMS}_PENDING`]: setLoadingState,
  [`${FETCH_PLATFORMS}_FULFILLED`]: setPlatforms,
  [`${FETCH_PLATFORMS}_PENDING`]: setLoadingState
};
