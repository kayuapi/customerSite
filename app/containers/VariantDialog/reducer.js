/*
 *
 * VariantDialog reducer
 *
 */
import produce from 'immer';
import {
  INIT_VARIANT,
  VARIANT_ADDED_TO_PRODUCT,
  VARIANT_REMOVED_FROM_PRODUCT,
} from './constants';

export const initialState = [];

function isExistedInStore(productName, store) {
  if (!Array.isArray(store) || !store.length) {
    return -1;
  }
  const k = store.map(({ name }) => name).indexOf(productName);
  return k;
}

/* eslint-disable default-case, no-param-reassign */
const variantDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT_VARIANT: {
        state = action.variantList;
        // action.variantList.forEach(variantItem => {
        //   console.log('variantItem', variantItem);
        //   const variant = {
        //     variant: variantItem.name,
        //     quantity: variantItem.quantity,
        //     price: variantItem.price,
        //   };
        //   draft.push(variant);
        // });
        return state;
        // break;
      }

      case VARIANT_ADDED_TO_PRODUCT: {
        const ifExistedGivesIndex = isExistedInStore(action.variantName, draft);
        if (ifExistedGivesIndex === -1) {
          const variant = {
            variant: action.variantName,
            quantity: action.variantQuantity,
            price: action.variantPrice,
          };
          draft.push(variant);
        } else {
          draft[ifExistedGivesIndex].quantity += 1;
        }
        break;
      }

      case VARIANT_REMOVED_FROM_PRODUCT: {
        const ifExistedGivesIndex = isExistedInStore(action.variantName, draft);
        if (ifExistedGivesIndex !== -1) {
          if (draft[ifExistedGivesIndex].quantity > 0) {
            draft[ifExistedGivesIndex].quantity -= 1;
          }
        }
        break;
      }
    }
  });

export default variantDialogReducer;
