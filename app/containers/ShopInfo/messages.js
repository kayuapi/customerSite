/*
 * ShopInfo Messages
 *
 * This contains all the text for the ShopInfo container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ShopInfo';

export default defineMessages({
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address:',
  },
  contactNumber: {
    id: `${scope}.contactNumber`,
    defaultMessage: 'Contact number:',
  },
  facebook: {
    id: `${scope}.facebook`,
    defaultMessage: 'Facebook:',
  },
  instagram: {
    id: `${scope}.instagram`,
    defaultMessage: 'Instagram:',
  },
  operatingHours: {
    id: `${scope}.operatingHours`,
    defaultMessage: 'Operating hours:',
  },
});
