/*
 *
 * Product actions
 *
 */

import {
  PRODUCT_ADDED_TO_CART,
  PRODUCT_REMOVED_FROM_CART,
  PRODUCT_WITH_VARIANT_ADDED_TO_CART,
  PRODUCT_WITH_VARIANT_REMOVED_FROM_CART,
  SET_PRODUCT_IN_CART,
  SET_VARIANTS_IN_PRODUCT_CART,
  CLEAR_PRODUCT_FROM_CART,
} from './constants';

export function addProductToCart({
  productName,
  productVariant,
  productQuantity,
  productPrice,
}) {
  return {
    type: PRODUCT_ADDED_TO_CART,
    productName,
    productVariant,
    productQuantity,
    productPrice,
  };
}

export function addProductWithVariantToCart({
  productName,
  productVariant,
  productQuantity,
  productPrice,
}) {
  return {
    type: PRODUCT_WITH_VARIANT_ADDED_TO_CART,
    productName,
    productVariant,
    productQuantity,
    productPrice,
  };
}

export function removeProductFromCart({
  productName,
  productQuantity,
  productPrice,
}) {
  return {
    type: PRODUCT_REMOVED_FROM_CART,
    productName,
    productQuantity,
    productPrice,
  };
}

export function removeProductWithVariantFromCart({
  productName,
  productVariant,
  productQuantity,
  productPrice,
}) {
  return {
    type: PRODUCT_WITH_VARIANT_REMOVED_FROM_CART,
    productName,
    productVariant,
    productQuantity,
    productPrice,
  };
}

export function setProductInCart({
  productName,
  productQuantity,
  productPrice,
}) {
  return {
    type: SET_PRODUCT_IN_CART,
    productName,
    productQuantity,
    productPrice,
  };
}

export function setVariantsInProductCart(productName, variantList) {
  return {
    type: SET_VARIANTS_IN_PRODUCT_CART,
    productName,
    variantList,
  };
}

export function clearProductFromCart() {
  return {
    type: CLEAR_PRODUCT_FROM_CART,
  };
}
