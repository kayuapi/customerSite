/*
 *
 * VariantDialog actions
 *
 */

import {
  INIT_VARIANT,
  VARIANT_ADDED_TO_PRODUCT,
  VARIANT_REMOVED_FROM_PRODUCT,
} from './constants';

export function initVariantOfProduct(productName, variantList, inCartProducts) {
  let processedVariantList = [];
  variantList.forEach((variantItem, id) => {
    processedVariantList = [...processedVariantList, variantItem];
    const matchedProductVariant = inCartProducts.filter(
      product =>
        product.name === productName && product.variant === variantItem.name,
    );

    if (matchedProductVariant.length === 1) {
      processedVariantList[id].quantity = matchedProductVariant[0].quantity;
    } else {
      processedVariantList[id].quantity = 0;
    }
  });
  return {
    type: INIT_VARIANT,
    variantList: processedVariantList,
  }
}

export function addVariantToProduct({
  variantName,
  variantQuantity,
  variantPrice,
}) {
  return {
    type: VARIANT_ADDED_TO_PRODUCT,
    variantName,
    variantQuantity,
    variantPrice,
  };
}

export function removeVariantFromProduct({
  variantName,
  variantQuantity,
  variantPrice,
}) {
  return {
    type: VARIANT_REMOVED_FROM_PRODUCT,
    variantName,
    variantQuantity,
    variantPrice,
  };
}
