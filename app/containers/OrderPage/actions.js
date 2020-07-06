/*
 *
 * OrderPage actions
 *
 */

import { LOAD_ORDER, LOAD_ORDER_SUCCESS, LOAD_ORDER_ERROR } from './constants';

export function loadOrder() {
  return {
    type: LOAD_ORDER,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} order The order data
 * @param  {string} chmtoken The order token
 *
 * @return {object}      An action object with a type of LOAD_ORDER_SUCCESS passing the order
 */
export function orderLoaded(order, chmtoken) {
  return {
    type: LOAD_ORDER_SUCCESS,
    order,
    chmtoken,
  };
}

/**
 * Dispatched when loading the order fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function orderLoadingError(error) {
  return {
    type: LOAD_ORDER_ERROR,
    error,
  };
}
