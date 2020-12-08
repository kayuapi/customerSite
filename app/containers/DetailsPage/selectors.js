import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectProducts } from '../Product/selectors';
/**
 * Direct selector to the detailsPage state domain
 */

const selectDetailsPageDomain = state => state.detailsPage || initialState;

const makeSelectOrderNumber = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.orderNumber,
  );

const makeSelectPrefix = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.prefix,
  );

const makeSelectTableNumber = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.tableNumber,
  );

const makeSelectPaymentMethod = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.paymentMethod,
  );

const makeSelectPostScript = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.postScript,
  );

const makeSelectFulfillmentMethod = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => substate.fulfillmentMethod,
  );

const makeSelectFulfillmentDerivatives = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => ({
      tableNumber: substate.tableNumber,

      firstName: substate.firstName,
      lastName: substate.lastName,
      phoneNumber: substate.phoneNumber,

      pickUpDate: substate.pickUpDate,
      pickUpTime: substate.pickUpTime,
      vehiclePlateNumber: substate.vehiclePlateNumber,

      deliveryDate: substate.deliveryDate,
      deliveryTime: substate.deliveryTime,

      addressLine1: substate.addressLine1,
      addressLine2: substate.addressLine2,
      city: substate.city,
      state: substate.state,
      zipPostalCode: substate.zipPostalCode,
      country: substate.country,
    }),
  );

const makeSelectFullName = () =>
  createSelector(
    selectDetailsPageDomain,
    substate => `${substate.lastName} ${substate.firstName}`,
  );

const makeSelectAddress = () =>
  createSelector(
    selectDetailsPageDomain,
    substate =>
      `${substate.addressLine1}, ${substate.addressLine2}, ${
        substate.zipPostalCode
      }, ${substate.city}, ${substate.state}, ${substate.country}`,
  );

const makeSelectAddressFormSubmission = () =>
  createSelector(
    selectDetailsPageDomain,
    selectProducts,
    (substate, products) => ({
      businessName: substate.businessName,
      orderNumber: substate.orderNumber,
      firstName: substate.firstName,
      lastName: substate.lastName,
      phoneNumber: substate.phoneNumber,
      tableNumber: substate.tableNumber,
      postScript: substate.postScript,
      fulfillmentMethod: substate.fulfillmentMethod,
      deliveryAddress: `${
        substate.addressLine1 ? `${substate.addressLine1}, ` : ''
      }${substate.addressLine2 ? `${substate.addressLine2}, ` : ''}`,
      // }, ${substate.city}, ${substate.state}, ${substate.country}`,
      pickUpDate: substate.pickUpDate,
      pickUpTime: substate.pickUpTime,
      deliveryDate: substate.deliveryDate,
      deliveryTime: substate.deliveryTime,
      vehiclePlateNumber: substate.vehiclePlateNumber,
      paymentMethod: substate.paymentMethod,
      cartItems: products,
    }),
  );

export {
  selectDetailsPageDomain,
  makeSelectPaymentMethod,
  makeSelectTableNumber,
  makeSelectPrefix,
  makeSelectFulfillmentDerivatives,
  makeSelectFullName,
  makeSelectAddress,
  makeSelectOrderNumber,
  makeSelectAddressFormSubmission,
  makeSelectPostScript,
  makeSelectFulfillmentMethod,
};
