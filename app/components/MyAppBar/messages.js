/*
 * MyAppBar Messages
 *
 * This contains all the text for the MyAppBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MyAppBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyAppBar component!',
  },
  chmboxOrdering: {
    id: `${scope}.chmboxOrdering`,
    defaultMessage: 'CHMBOX Ordering',
  },
});
