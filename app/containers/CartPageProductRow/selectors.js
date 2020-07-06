import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cartPageProductRow state domain
 */

const selectCartPageProductRowDomain = state =>
  state.cartPageProductRow || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CartPageProductRow
 */

const makeSelectCartPageProductRow = () =>
  createSelector(
    selectCartPageProductRowDomain,
    substate => substate,
  );

export default makeSelectCartPageProductRow;
export { selectCartPageProductRowDomain };
