/*
 *
 * DetailsPage reducer
 *
 */
import produce from 'immer';
import {
  CONFIGURE_BUSINESS_NAME,
  CONFIGURE_ORDER_NUMBER,
  CONFIGURE_FULFILLMENT_METHOD,
  CONFIGURE_FULFILLMENT_DERIVATIVES,
  CONFIGURE_POSTSCRIPT,
  CONFIGURE_PAYMENT_METHOD,
  RESET_ALL_FORM_EXCEPT_BUSINESS_NAME,
} from './constants';

export const initialState = {
  businessName: '',
  orderNumber: `${String(
    new Date().getTime() +
      Math.random()
        .toString(36)
        .substring(2, 4),
  )}`,
  fulfillmentMethod: '',
  paymentMethod: '',
  postScript: '',

  tableNumber: '',

  firstName: '',
  lastName: '',
  phoneNumber: '',

  pickUpDate: ``,
  pickUpTime: ``,
  vehiclePlateNumber: '',

  deliveryDate: '',
  deliveryTime: '',
  deliveryAddress: '',

  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipPostalCode: '',
  country: '',
};

/* eslint-disable default-case, no-param-reassign */
const detailsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONFIGURE_BUSINESS_NAME:
        draft.businessName = action.businessName;
        break;

      case CONFIGURE_FULFILLMENT_METHOD:
        draft.fulfillmentMethod = action.fulfillmentMethod;
        break;

      case CONFIGURE_ORDER_NUMBER:
        draft.orderNumber = action.orderNumber;
        break;

      case CONFIGURE_FULFILLMENT_DERIVATIVES:
        draft.tableNumber = action.tableNumber;

        draft.firstName = action.firstName;
        draft.lastName = action.lastName;
        draft.phoneNumber = action.phoneNumber;

        draft.pickUpDate = action.pickUpDate;
        draft.pickUpTime = action.pickUpTime;
        draft.vehiclePlateNumber = action.vehiclePlateNumber;

        draft.deliveryDate = action.deliveryDate;
        draft.deliveryTime = action.deliveryTime;
        draft.deliveryAddress = action.deliveryAddress;
        draft.addressLine1 = action.addressLine1;
        draft.addressLine2 = action.addressLine2;
        draft.city = action.city;
        draft.state = action.state;
        draft.zipPostalCode = action.zipPostalCode;
        draft.country = action.country;
        break;

      case CONFIGURE_POSTSCRIPT:
        draft.postScript = action.postScript;
        break;

      case CONFIGURE_PAYMENT_METHOD:
        draft.paymentMethod = action.paymentMethod;
        break;

      case RESET_ALL_FORM_EXCEPT_BUSINESS_NAME:
        draft.fulfillmentMethod = initialState.fulfillmentMethod;
        draft.paymentMethod = initialState.paymentMethod;
        draft.postScript = initialState.postScript;

        draft.tableNumber = initialState.tableNumber;

        draft.firstName = initialState.firstName;
        draft.lastName = initialState.lastName;
        draft.phoneNumber = initialState.phoneNumber;

        draft.pickUpDate = initialState.pickUpDate;
        draft.pickUpTime = initialState.pickUpTime;
        draft.vehiclePlateNumber = initialState.vehiclePlateNumber;

        draft.deliveryDate = initialState.deliveryDate;
        draft.deliveryTime = initialState.deliveryTime;
        draft.deliveryAddress = initialState.deliveryAddress;

        draft.addressLine1 = initialState.addressLine1;
        draft.addressLine2 = initialState.addressLine2;
        draft.city = initialState.city;
        draft.state = initialState.state;
        draft.zipPostalCode = initialState.zipPostalCode;
        draft.country = initialState.country;

        break;
    }
  });

export default detailsPageReducer;
