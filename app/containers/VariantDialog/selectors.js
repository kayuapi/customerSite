import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the variantDialog state domain
 */

const selectVariantDialogDomain = state => state.variantDialog || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VariantDialog
 */

const makeSelectVariantDialog = () =>
  createSelector(
    selectVariantDialogDomain,
    substate => substate,
  );

export default makeSelectVariantDialog;
export { selectVariantDialogDomain, makeSelectVariantDialog };
