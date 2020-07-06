import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the menuPage state domain
 */

const selectMenuPageDomain = state => state.menuPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MenuPage
 */

const makeSelectMenuPage = () =>
  createSelector(
    selectMenuPageDomain,
    substate => substate,
  );

export default makeSelectMenuPage;
export { selectMenuPageDomain };
