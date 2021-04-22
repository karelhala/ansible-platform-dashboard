import * as ActionTypes from '../action-types';
import * as CatalogHelper from '../../helpers/catalog/catalog-helper';
import { defaultSettings } from '../../helpers/shared/pagination';

export const fetchOrders = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_ORDERS,
    payload: CatalogHelper.getOrders()
  });
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
