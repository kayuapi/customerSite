import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cartPage state domain
 */

const selectCartPageDomain = state => state.cartPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CartPage
 */

const makeSelectCartPage = () =>
  createSelector(
    selectCartPageDomain,
    substate => substate,
  );

const makeSelectIsOpen = () =>
  createSelector(
    selectCartPageDomain,
    substate => substate.isOpen,
  );

export { makeSelectCartPage, makeSelectIsOpen };
