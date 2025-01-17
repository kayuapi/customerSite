/*
 *
 * DetailsPage actions
 *
 */
import {
  CONFIGURE_BUSINESS_NAME,
  CONFIGURE_TABLE_NUMBER,
  CONFIGURE_PREFIX,
  CONFIGURE_ORDER_NUMBER,
  CONFIGURE_FULFILLMENT_METHOD,
  CONFIGURE_FULFILLMENT_DERIVATIVES,
  CONFIGURE_POSTSCRIPT,
  CONFIGURE_PAYMENT_METHOD,
  RESET_ALL_FORM_EXCEPT_BUSINESS_NAME,
} from './constants';

export function configureBusinessName({ businessName }) {
  return {
    type: CONFIGURE_BUSINESS_NAME,
    businessName,
  };
}

export function configureTableNumber({ tableNumber }) {
  return {
    type: CONFIGURE_TABLE_NUMBER,
    tableNumber,
  };
}

export function configurePrefix({ prefix }) {
  return {
    type: CONFIGURE_PREFIX,
    prefix,
  };
}

export function configureOrderNumber({ orderNumber }) {
  return {
    type: CONFIGURE_ORDER_NUMBER,
    orderNumber,
  };
}

export function configureFulfillmentMethod({ fulfillmentMethod }) {
  return {
    type: CONFIGURE_FULFILLMENT_METHOD,
    fulfillmentMethod,
  };
}

export function configurePostScript({ postScript }) {
  return {
    type: CONFIGURE_POSTSCRIPT,
    postScript,
  };
}

export function configureFulfillmentDerivatives({
  tableNumber,
  firstName,
  lastName,
  phoneNumber,
  pickUpDate,
  pickUpTime,
  vehiclePlateNumber,
  deliveryDate,
  deliveryTime,
  addressLine1,
  addressLine2,
  city,
  state,
  zipPostalCode,
  country,
}) {
  return {
    type: CONFIGURE_FULFILLMENT_DERIVATIVES,
    tableNumber,
    firstName,
    lastName,
    phoneNumber,
    // eslint-disable-next-line prettier/prettier
    // pickUpDate: pickUpDate ? `${pickUpDate.getFullYear()}-${`0${pickUpDate.getMonth()+1}`.slice(-2)}-${`0${pickUpDate.getDate()}`.slice(-2)}` : pickUpDate,
    pickUpDate,
    // eslint-disable-next-line prettier/prettier
    // pickUpTime: pickUpTime ? `${`0${pickUpTime.getHours()}`.slice(-2)}:${`0${pickUpTime.getMinutes()}`.slice(-2)}:${`0${pickUpTime.getSeconds()}`.slice(-2)}` : pickUpTime,
    pickUpTime,
    vehiclePlateNumber,
    // eslint-disable-next-line prettier/prettier
    // deliveryDate: deliveryDate ? `${deliveryDate.getFullYear()}-${`0${deliveryDate.getMonth()+1}`.slice(-2)}-${`0${deliveryDate.getDate()}`.slice(-2)}` : deliveryDate,
    deliveryDate,
    // eslint-disable-next-line prettier/prettier
    // deliveryTime: deliveryTime ? `${`0${deliveryTime.getHours()}`.slice(-2)}:${`0${deliveryTime.getMinutes()}`.slice(-2)}:${`0${deliveryTime.getSeconds()}`.slice(-2)}` : deliveryTime,
    deliveryTime,
    addressLine1,
    addressLine2,
    city,
    state,
    zipPostalCode,
    country,
  };
}

export function configurePaymentMethod({ paymentMethod }) {
  return {
    type: CONFIGURE_PAYMENT_METHOD,
    paymentMethod,
  };
}

export function resetForm() {
  return {
    type: RESET_ALL_FORM_EXCEPT_BUSINESS_NAME,
  };
}
