/*
 *
 * MenuPage actions
 *
 */
import {
  LOAD_MENU,
  LOAD_MENU_SUCCESS,
  LOAD_MENU_ERROR,
  SUBMIT_ORDER,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_ERROR,
} from './constants';

export function loadMenu() {
  return {
    type: LOAD_MENU,
  };
}

/**
 * Dispatched when the menus are loaded by the request saga
 *
 * @param  {array} menu The menu data
 *
 * @return {object}      An action object with a type of LOAD_MENU_SUCCESS passing the menu
 */
export function menuLoaded(menu) {
  return {
    type: LOAD_MENU_SUCCESS,
    menu,
  };
}

/**
 * Dispatched when loading the menus fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_MENU_ERROR passing the error
 */
export function menuLoadingError(error) {
  return {
    type: LOAD_MENU_ERROR,
    error,
  };
}

export function submitOrder() {
  return {
    type: SUBMIT_ORDER,
  };
}

/**
 * Dispatched when the orders are submitted by the request saga
 *
 * @param  {array} order The order data
 *
 * @return {object}      An action object with a type of SUBMIT_ORDER_SUCCESS passing the order
 */
export function orderSubmitted(order) {
  return {
    type: SUBMIT_ORDER_SUCCESS,
    order,
  };
}

/**
 * Dispatched when loading the order fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SUBMIT_ORDER_ERROR passing the error
 */
export function orderSubmittingError(error) {
  return {
    type: SUBMIT_ORDER_ERROR,
    error,
  };
}
