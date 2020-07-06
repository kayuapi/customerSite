/*
 * VariantDialog Messages
 *
 * This contains all the text for the VariantDialog container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VariantDialog';

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
    defaultMessage: 'Ok',
  },
  variantDialogCancel: {
    id: `${scope}.variantDialogCancel`,
    defaultMessage: 'Cancel',
  },
});
