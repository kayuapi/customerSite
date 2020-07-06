import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shopInfo state domain
 */

const selectShopInfoDomain = state => state.shopInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ShopInfo
 */

const makeSelectShopInfo = () =>
  createSelector(
    selectShopInfoDomain,
    substate => substate,
  );

export default makeSelectShopInfo;
export { selectShopInfoDomain };
