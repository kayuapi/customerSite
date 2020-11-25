import { useContext } from 'react';

import { CartContext } from './CartProvider';
// import { useCartInterface } from "./types";

/**
 * The main API for useMenuItemsWorkingArea
 *
 * @return {array} cartItems contains all cart items
 * @return {function} updateCartItem takes in menu item's id and its attribute key and value to update the cart accordingly
 * @return {function} createCartItem creates a cart item and enlist it
 * @return {function} deleteCartItem takes in menu item's id to delete it from cart
 */

export const useCart = () => {
  const { state, dispatch } = useContext(CartContext);

  const updateCartItem = (id, attributeKey, attributeValue) => {
    dispatch({ type: 'updateCartItem', id, attributeKey, attributeValue });
  };
  const createCartItem = cartItem => {
    dispatch({ type: 'createCartItem', cartItem });
  };
  const deleteCartItem = id => {
    dispatch({ type: 'deleteCartItem', id });
  };
  const clearCartItems = () => {
    dispatch({ type: 'clearCartItems' });
  };

  return {
    cartItems: state.cartItems,
    updateCartItem,
    createCartItem,
    deleteCartItem,
    clearCartItems,
  };
};
