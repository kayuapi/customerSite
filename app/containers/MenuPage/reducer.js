/*
 *
 * MenuPage reducer
 *
 */
import produce from 'immer';
import { PRODUCT_ADDED_TO_CART, PRODUCT_REMOVED_FROM_CART } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const menuPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    // switch (action.type) {
    //   case PRODUCT_ADDED_TO_CART:
    //     draft.inCartProducts.push({...action.inCartProduct});
    //     break;
    //   case PRODUCT_REMOVED_FROM_CART:
    //     draft.inCartProduct.remove();
    //     break;
    // }
  });

export default menuPageReducer;
