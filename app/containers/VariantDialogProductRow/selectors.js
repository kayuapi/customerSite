import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the variantDialogProductRow state domain
 */

const selectVariantDialogProductRowDomain = state =>
  state.variantDialogProductRow || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VariantDialogProductRow
 */

const makeSelectVariantDialogProductRow = () =>
  createSelector(
    selectVariantDialogProductRowDomain,
    substate => substate,
  );

export default makeSelectVariantDialogProductRow;
export { selectVariantDialogProductRowDomain };
