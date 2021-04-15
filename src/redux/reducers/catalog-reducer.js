import { FETCH_ORDERS, FETCH_PLATFORMS, FETCH_PORTFOLIO_ITEMS, FETCH_PORTFOLIOS, SET_CATALOG_LOADING_STATE } from '../action-types';

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
  }
};

const setLoadingState = (state, { payload = true }) => ({
  ...state,
  isLoading: payload
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
  [`${FETCH_ORDERS}_FULFILLED`]: setOrders,
  [`${FETCH_ORDERS}_PENDING`]: setLoadingState,
  [`${FETCH_PORTFOLIOS}_FULFILLED`]: setPortfolios,
  [`${FETCH_PORTFOLIOS}_PENDING`]: setLoadingState,
  [`${FETCH_PORTFOLIO_ITEMS}_FULFILLED`]: setPortfolioItems,
  [`${FETCH_PORTFOLIO_ITEMS}_PENDING`]: setLoadingState,
  [`${FETCH_PLATFORMS}_FULFILLED`]: setPlatforms,
  [`${FETCH_PLATFORMS}_PENDING`]: setLoadingState
};
