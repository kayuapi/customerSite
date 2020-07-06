/*
 *
 * CartPage reducer
 *
 */
import produce from 'immer';
import { OPEN_CART, CLOSE_CART } from './constants';

export const initialState = {
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const cartPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_CART: {
        draft.isOpen = true;
        break;
      }
      case CLOSE_CART: {
        draft.isOpen = false;
      }
    }
  });

export default cartPageReducer;
