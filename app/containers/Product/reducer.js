/*
 *
 * Product reducer
 *
 */
import produce from 'immer';
import {
  PRODUCT_ADDED_TO_CART,
  PRODUCT_REMOVED_FROM_CART,
  PRODUCT_WITH_VARIANT_ADDED_TO_CART,
  PRODUCT_WITH_VARIANT_REMOVED_FROM_CART,
  SET_PRODUCT_IN_CART,
  SET_VARIANTS_IN_PRODUCT_CART,
  CLEAR_PRODUCT_FROM_CART,
} from './constants';

export const initialState = [];

/* eslint-disable default-case, no-param-reassign */

function isExistedInStore(productName, store) {
  if (!Array.isArray(store) || !store.length) {
    return -1;
  }
  const k = store.map(({ name }) => name).indexOf(productName);
  return k;
}

function isProductVariantExistedInStore(productName, variantName, store) {
  // let combinedName = `${productName}(${variantName})`;
  if (!Array.isArray(store) || !store.length) {
    return -1;
  }
  const k = store.findIndex(
    el => el.name === productName && el.variant === variantName,
  );
  // store.map(el => console.log('aaa', el));
  return k;
}

const productReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PRODUCT_ADDED_TO_CART: {
        const ifExistedGivesIndex = isExistedInStore(
          `${action.productName}`,
          draft,
        );
        if (ifExistedGivesIndex === -1) {
          const product = {
            name: action.productName,
            variant: action.productVariant,
            quantity: action.productQuantity,
            price: action.productPrice,
          };
          draft.push(product);
        } else {
          draft[ifExistedGivesIndex].quantity += 1;
        }
        break;
      }

      case PRODUCT_WITH_VARIANT_ADDED_TO_CART: {
        const ifExistedGivesIndex = isProductVariantExistedInStore(
          action.productName,
          action.productVariant,
          draft,
        );
        // also check variant is not empty
        if (ifExistedGivesIndex === -1 && action.productQuantity !== 0) {
          const product = {
            name: action.productName,
            variant: action.variantName,
            quantity: action.productQuantity,
            price: action.productPrice,
          };
          draft.push(product);
          // eslint-disable-next-line no-empty
        } else if (ifExistedGivesIndex === -1 && action.productQuantity === 0) {
        } else {
          draft[ifExistedGivesIndex].quantity += 1;
        }
        break;
      }

      case PRODUCT_REMOVED_FROM_CART: {
        const ifExistedGivesIndex = isExistedInStore(action.productName, draft);
        // no need to check for existence as its existence is ensured by disable the button
        // check if the quantity is 1, then remove it from the store
        if (draft[ifExistedGivesIndex].quantity === 1) {
          draft.splice(ifExistedGivesIndex, 1);
        } else {
          draft[ifExistedGivesIndex].quantity -= 1;
        }
        break;
      }

      case PRODUCT_WITH_VARIANT_REMOVED_FROM_CART: {
        const ifExistedGivesIndex = isProductVariantExistedInStore(
          action.productName,
          action.productVariant,
          draft,
        );
        // no need to check for existence as its existence is ensured by disable the button
        // check if the quantity is 1, then remove it from the store
        if (draft[ifExistedGivesIndex].quantity === 1) {
          draft.splice(ifExistedGivesIndex, 1);
        } else {
          draft[ifExistedGivesIndex].quantity -= 1;
        }
        break;
      }

      case SET_PRODUCT_IN_CART: {
        const product = {
          name: action.productName,
          quantity: action.productQuantity,
          price: action.productPrice,
        };
        const k = draft.product
          .map(({ name }) => name)
          .indexOf(action.product.name);
        if (k !== -1) {
          draft.product[k] = product;
        } else {
          draft.product.push(product);
        }
        break;
      }

      case SET_VARIANTS_IN_PRODUCT_CART: {
        action.variantList.forEach(variant => {
          const ifExistedGivesIndex = isProductVariantExistedInStore(
            action.productName,
            variant.name,
            draft,
          );
          // also check variant is not empty
          if (ifExistedGivesIndex === -1 && variant.quantity !== 0) {
            const product = {
              name: action.productName,
              variant: variant.name,
              quantity: variant.quantity,
              price: variant.price,
            };
            draft.push(product);
          // eslint-disable-next-line no-empty
          } else if (ifExistedGivesIndex === -1 && variant.quantity === 0) {
          } else {
            draft[ifExistedGivesIndex].quantity = variant.quantity;
          }
        });
        break;
      }

      case CLEAR_PRODUCT_FROM_CART: {
        draft.splice(0, draft.length);
      }
    }
  });

export default productReducer;
