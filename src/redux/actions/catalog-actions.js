import * as ActionTypes from '../action-types';
import * as CatalogHelper from '../../helpers/catalog/catalog-helper';
import { defaultSettings } from '../../helpers/shared/pagination';

export const fetchOrders = (
  filters, pagination = defaultSettings
) => (dispatch) => {
  let queryFilter = Object.entries(filters)
  .filter(([ , value ]) => value && value.length > 0)
  .map(([ key, value ]) =>
    Array.isArray(value)
      ? value.map((value) => `filter[${key}][]=${value}`).join('&')
      : `filter[${key}][contains_i]=${value}`
  )
  .join('&');
  if (pagination.sortBy) {
    queryFilter = `${queryFilter}&sort_by=${
      pagination.sortBy
    }:${pagination.sortDirection || 'desc'}`;
  }

  dispatch({ type: `${ActionTypes.FETCH_ORDERS}_PENDING` });
  return CatalogHelper.getOrders(queryFilter, pagination)
  .then(({ portfolioItems, ...orders }) => {
    dispatch({
      type: ActionTypes.SET_PORTFOLIO_ITEMS,
      payload: portfolioItems
    });
    return dispatch({
      type: `${ActionTypes.FETCH_ORDERS}_FULFILLED`,
      meta: {
        ...pagination,
        filter: queryFilter,
        filters,
        storeState: true,
        stateKey: 'orders'
      },
      payload: orders
    });
  })
  .catch((error) =>
    dispatch({
      type: `${ActionTypes.FETCH_ORDERS}_REJECTED`,
      payload: error
    })
  );
};

export const doFetchPortfolios = ({
  filters,
  ...options
} = defaultSettings) => ({
  type: ActionTypes.FETCH_PORTFOLIOS,
  meta: { ...defaultSettings, filters, ...options },
  payload: CatalogHelper.listPortfolios(filters, options)
});

export const fetchPortfolios = (options) => (
  dispatch) =>
  dispatch(
    doFetchPortfolios(options)
  );

export const fetchPortfolioItems = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PORTFOLIO_ITEMS,
    payload: CatalogHelper.getPortfolioItems()
  });
};

export const fetchPlatforms = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PLATFORMS,
    payload: CatalogHelper.getPlatforms()
  });
};
