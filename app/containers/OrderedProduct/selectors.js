import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderedProduct state domain
 */

const selectOrderedProductDomain = state =>
  state.orderedProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderedProduct
 */

const makeSelectOrderedProduct = () =>
  createSelector(
    selectOrderedProductDomain,
    substate => substate,
  );

export default makeSelectOrderedProduct;
export { selectOrderedProductDomain };
