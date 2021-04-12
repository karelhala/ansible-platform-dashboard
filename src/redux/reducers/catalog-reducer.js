import { FETCH_ORDERS, SET_CATALOG_LOADING_STATE } from '../action-types';

import { defaultSettings } from '../../helpers/shared/pagination';
// Initial State
export const catalogInitialState = {
  isLoading: false,
  orders: {
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

export default {
  [SET_CATALOG_LOADING_STATE]: setLoadingState,
  [`${FETCH_ORDERS}_FULFILLED`]: setOrders,
  [`${FETCH_ORDERS}_PENDING`]: setLoadingState
};
