import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the product state domain
 */

const selectProducts = state => state.product || initialState;

const makeSelectProduct = () =>
  createSelector(
    selectProducts,
    substate => substate,
  );

// const makeSelectProductVariantQuantity = (name, variant) =>
//   createSelector(
//     selectProducts,
//     products =>
//       products
//         .filter(product => product.name === name && product.variant === variant)
//         .reduce((acc, item) => acc + item.quantity, 0),
//   );

const makeSelectTotalProductsQuantity = () =>
  createSelector(
    selectProducts,
    products => products.reduce((acc, item) => acc + item.quantity, 0),
  );

export { selectProducts, makeSelectProduct, makeSelectTotalProductsQuantity };
