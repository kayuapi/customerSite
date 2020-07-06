/*
 *
 * CartPage actions
 *
 */

import { OPEN_CART, CLOSE_CART } from './constants';

export function openCart() {
  return {
    type: OPEN_CART,
  };
}

export function closeCart() {
  return {
    type: CLOSE_CART,
  };
}
