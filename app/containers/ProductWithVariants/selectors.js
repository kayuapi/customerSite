import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productWithVariants state domain
 */

const selectProductWithVariantsDomain = state =>
  state.productWithVariants || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductWithVariants
 */

const makeSelectProductWithVariants = () =>
  createSelector(
    selectProductWithVariantsDomain,
    substate => substate,
  );

export default makeSelectProductWithVariants;
export { selectProductWithVariantsDomain };
