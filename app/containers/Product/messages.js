/*
 * Product Messages
 *
 * This contains all the text for the Product container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Product';

export default defineMessages({
  orderQuantity: {
    id: `${scope}.orderQuantity`,
    defaultMessage: 'qty',
  },
  choose: {
    id: `${scope}.choose`,
    defaultMessage: 'Choose',
  },
});
