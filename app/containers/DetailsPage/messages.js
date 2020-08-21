/*
 * DetailsPage Messages
 *
 * This contains all the text for the DetailsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DetailsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DetailsPage container!',
  },
  checkout: {
    id: `${scope}.checkout`,
    defaultMessage: 'Checkout',
  },
  shippingAddress: {
    id: `${scope}.shippingAddress`,
    defaultMessage: 'Contact ',
  },
  paymentMethods: {
    id: `${scope}.paymentMethods`,
    defaultMessage: 'Payment',
  },
  orderReview: {
    id: `${scope}.orderReview`,
    defaultMessage: 'Review',
  },
  personalInformation: {
    id: `${scope}.personalInformation`,
    defaultMessage: 'Personal Information',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  postScriptum: {
    id: `${scope}.postScriptum`,
    defaultMessage: 'P.S.',
  },
  deliveryOptions: {
    id: `${scope}.deliveryOptions`,
    defaultMessage: 'Delivery Options',
  },
  fulfillmentMethods: {
    id: `${scope}.fulfillmentMethods`,
    defaultMessage: 'Delivery Options',
  },
  selfPickUp: {
    id: `${scope}.selfPickUp`,
    defaultMessage: 'Self Pick-up',
  },
  delivery: {
    id: `${scope}.delivery`,
    defaultMessage: 'Delivery',
  },
  addressLine1: {
    id: `${scope}.addressLine1`,
    defaultMessage: 'Address line 1',
  },
  addressLine2: {
    id: `${scope}.addressLine2`,
    defaultMessage: 'Address line 2',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City',
  },
  stateProvinceRegion: {
    id: `${scope}.stateProvinceRegion`,
    defaultMessage: 'State/Province/Region',
  },
  zipPostalCode: {
    id: `${scope}.zipPostalCode`,
    defaultMessage: 'Zip/Postal code',
  },
  country: {
    id: `${scope}.country`,
    defaultMessage: 'Country',
  },
  deliveryDate: {
    id: `${scope}.deliveryDate`,
    defaultMessage: 'Delivery Date',
  },
  deliveryTime: {
    id: `${scope}.deliveryTime`,
    defaultMessage: 'Delivery Time',
  },
  pickUpDate: {
    id: `${scope}.pickUpDate`,
    defaultMessage: 'Pickup Date',
  },
  pickUpTime: {
    id: `${scope}.pickUpTime`,
    defaultMessage: 'Pickup Time: 8am - 3.30pm',
  },
  reviewPickUpTime: {
    id: `${scope}.reviewPickUpTime`,
    defaultMessage: 'Pickup Time',
  },
  vehiclePlateNumber: {
    id: `${scope}.vehiclePlateNumber`,
    defaultMessage: 'Vehicle Plate Number',
  },
  cashOnDelivery: {
    id: `${scope}.cashOnDelivery`,
    defaultMessage: 'Cash on Delivery',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Required',
  },

  firstNameError: {
    id: `${scope}.firstNameError`,
    defaultMessage: 'Required, maximum characters allowed: 30',
  },
  lastNameError: {
    id: `${scope}.lastNameError`,
    defaultMessage: 'Required, maximum characters allowed: 30',
  },
  phoneNumberError: {
    id: `${scope}.phoneNumberError`,
    defaultMessage: 'Required, maximum characters allowed: 12',
  },
  postScriptumError: {
    id: `${scope}.postScriptumError`,
    defaultMessage: 'Maximum characters allowed: 50',
  },
  addressLine1Error: {
    id: `${scope}.addressLine1Error`,
    defaultMessage: 'Required, maximum characters allowed: 50',
  },
  addressLine2Error: {
    id: `${scope}.addressLine2Error`,
    defaultMessage: 'Optional, maximum characters allowed: 50',
  },
  zipPostalCodeError: {
    id: `${scope}.zipPostalCodeError`,
    defaultMessage: 'Required, maximum characters allowed: 6',
  },
  vehiclePlateNumberError: {
    id: `${scope}.vehiclePlateNumberError`,
    defaultMessage: 'Required, maximum characters allowed: 20',
  },
  tableNumberError: {
    id: `${scope}.tableNumberError`,
    defaultMessage: 'Required, maximum characters allowed: 12',
  },


  receivedOrder: {
    id: `${scope}.receivedOrder`,
    defaultMessage:
      'Your order number is {orderNumber}. {linebreak}We have received your order and will phone you for confirmation shortly.',
  },
  receivedOrderForOnPremise: {
    id: `${scope}.receivedOrderForOnPremise`,
    defaultMessage: 'Your order number is {orderNumber}. {linebreak}',
  },
  receivedOrderForDelivery: {
    id: `${scope}.receivedOrderForDelivery`,
    defaultMessage:
      'Your order number is {orderNumber}. {linebreak}We have received your order and will phone you for confirmation shortly.',
  },
  orderSummary: {
    id: `${scope}.orderSummary`,
    defaultMessage: 'Order summary',
  },
  paymentDetails: {
    id: `${scope}.paymentDetails`,
    defaultMessage: 'Payment details',
  },
  placeOrder: {
    id: `${scope}.placeOrder`,
    defaultMessage: 'Place order',
  },
  placeOrderAndWhatsappNotify: {
    id: `${scope}.placeOrderAndWhatsappNotify`,
    defaultMessage: 'Place order and whatsapp notify',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  thankYou: {
    id: `${scope}.thankYou`,
    defaultMessage: 'Thank you for your order',
  },
  variableTranslate: {
    id: `${scope}.variableTranslate`,
    defaultMessage: '{translated}',
  },
  personalDetailsAndDeliveryMethod: {
    id: `${scope}.personalDetailsAndDeliveryMethod`,
    defaultMessage: 'Personal details & Delivery method',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity: {quantity}',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
  },
  onlineBanking: {
    id: `${scope}.onlineBanking`,
    defaultMessage: 'Online banking',
  },
  eWallet: {
    id: `${scope}.eWallet`,
    defaultMessage: 'Electronic wallet',
  },
  eWalletTouchNGo: {
    id: `${scope}.eWalletTouchNGo`,
    defaultMessage: 'E-wallet: Tounch n Go',
  },
  eWalletBoost: {
    id: `${scope}.eWalletBoost`,
    defaultMessage: 'E-wallet: Boost',
  },
  dateError: {
    id: `${scope}.dateError`,
    defaultMessage: "only accept next day's order for now",
  },
  onPremise: {
    id: `${scope}.onPremise`,
    defaultMessage: 'On premise',
  },
  tableNumber: {
    id: `${scope}.tableNumber`,
    defaultMessage: 'Table Number',
  },
  thankYouOnPremise: {
    id: `${scope}.thankYouOnPremise`,
    defaultMessage: 'Thank you message for on premise',
  },
  thankYouOnDelivery: {
    id: `${scope}.thankYouOnDelivery`,
    defaultMessage: 'Thank you message for on delivery',
  },
  whatsappNotification: {
    id: `${scope}.whatsappNotification`,
    defaultMessage:
      '***Click send to notify the shop about this order.***{linebreak}Order number: {orderNumber}.',
  },
});
