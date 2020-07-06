/*
 *
 * OrderPage reducer
 *
 */
import produce from 'immer';
import { LOAD_ORDER } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const orderPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case LOAD_ORDER:
        break;
    }
  });

export default orderPageReducer;
