import * as ActionTypes from '../action-types';
import * as CatalogHelper from '../../helpers/catalog/catalog-helper';

const setCatalogAvailability = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_CATALOG_AVAILABILITY,
    payload: value
  });
};

const setCatalogError = (dispatch, value = true) => {
  return dispatch({
    type: ActionTypes.SET_CATALOG_ERROR,
    payload: value
  });
};

export const fetchOrders = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_ORDERS,
    payload: CatalogHelper.getOrders().catch((err) => {
      if (err.status === 404) {
        setCatalogAvailability(dispatch, false);
      }
      else {
        setCatalogError(dispatch, true);
      }
    })
  });
};

export const fetchPortfolios = (options) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PLATFORMS,
    payload: CatalogHelper.listPortfolios(options).catch((err) => {
      if (err.status === 404) {
        setCatalogAvailability(dispatch, false);
      } else {
        setCatalogError(dispatch, true);
      }
    })
  });
};

export const fetchPortfolioItems = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PORTFOLIO_ITEMS,
    payload: CatalogHelper.listPortfolioItems().catch((err) => {
      if (err.status === 404) {
        setCatalogAvailability(dispatch, false);
      }
      else {
        setCatalogError(dispatch, true);
      }
    })
  });
};

export const fetchPlatforms = () => (dispatch) => {
  return dispatch({
    type: ActionTypes.FETCH_PLATFORMS,
    payload: CatalogHelper.getPlatforms().catch((err) => {
      if (err.status === 404) {
        setCatalogAvailability(dispatch, false);
      }
      else {
        setCatalogError(dispatch, true);
      }
    })
  });
};

