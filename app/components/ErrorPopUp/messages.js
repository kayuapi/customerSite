/*
 * ErrorPopUp Messages
 *
 * This contains all the text for the ErrorPopUp component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ErrorPopUp';

export default defineMessages({
  networkError: {
    id: `${scope}.networkError`,
    defaultMessage: 'Network Error!',
  },
  emptyOrderError: {
    id: `${scope}.emptyOrderError`,
    defaultMessage: 'Empty Order Error!',
  },
  networkErrorActionToTake: {
    id: `${scope}.networkErrorActionToTake`,
    defaultMessage: 'Network error occurs, please try again later.',
  },
  emptyOrderErrorActionToTake: {
    id: `${scope}.emptyOrderErrorActionToTake`,
    defaultMessage: 'Empty order error occurs, please order something.',
  },
});
