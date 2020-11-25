/*
 * ALaCarteVariantsPopUp Messages
 *
 * This contains all the text for the ALaCarteVariantsPopUp container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ALaCarteVariantsPopUp';

export default defineMessages({
  variantDialogTitle: {
    id: `${scope}.variantDialogTitle`,
    defaultMessage: 'Variants Selection',
  },
  variantDialogItemTitle: {
    id: `${scope}.variantDialogItemTitle`,
    defaultMessage: 'Title',
  },
  variantDialogItemQuantity: {
    id: `${scope}.variantDialogItemQuantity`,
    defaultMessage: 'Qty.',
  },
  variantDialogItemPrice: {
    id: `${scope}.variantDialogItemPrice`,
    defaultMessage: 'Price',
  },
  variantDialogConfirm: {
    id: `${scope}.variantDialogConfirm`,
    defaultMessage: 'Add to cart',
  },
  variantDialogCancel: {
    id: `${scope}.variantDialogCancel`,
    defaultMessage: 'Cancel',
  },
});
