/*
 * MenuPage Messages
 *
 * This contains all the text for the MenuPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MenuPage';

export default defineMessages({
  poweredBy: {
    id: `${scope}.poweredBy`,
    defaultMessage: 'powered by Chmbox',
  },
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Confirmation on orders',
  },
  dialogDetails: {
    id: `${scope}.dialogDetails`,
    defaultMessage: 'Details',
  },
  dialogPrice: {
    id: `${scope}.dialogPrice`,
    defaultMessage: 'Price',
  },
  dialogItemTitle: {
    id: `${scope}.dialogItemTitle`,
    defaultMessage: 'Title',
  },
  dialogItemQuantity: {
    id: `${scope}.dialogItemQuantity`,
    defaultMessage: 'Qty.',
  },
  dialogItemUnit: {
    id: `${scope}.dialogItemUnit`,
    defaultMessage: 'Unit',
  },
  dialogItemSum: {
    id: `${scope}.dialogItemSum`,
    defaultMessage: 'Sum',
  },
  dialogItemSubtotal: {
    id: `${scope}.dialogItemSubtotal`,
    defaultMessage: 'Subtotal',
  },
  dialogItemTax: {
    id: `${scope}.dialogItemTax`,
    defaultMessage: 'Tax',
  },
  dialogItemTotal: {
    id: `${scope}.dialogItemTotal`,
    defaultMessage: 'Total',
  },
  dialogOrder: {
    id: `${scope}.dialogOrder`,
    defaultMessage: 'Make order',
  },
  dialogCancel: {
    id: `${scope}.dialogCancel`,
    defaultMessage: 'Cancel',
  },
  submitOrderSuccess: {
    id: `${scope}.submitOrderSuccess`,
    defaultMessage: 'Order is submitted!',
  },
  networkError: {
    id: `${scope}.networkError`,
    defaultMessage: 'Bad connection, please refresh and try again.',
  },
});
