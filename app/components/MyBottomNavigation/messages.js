/*
 * MyBottomNavigation Messages
 *
 * This contains all the text for the MyBottomNavigation component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MyBottomNavigation';

export default defineMessages({
  table: {
    id: `${scope}.table`,
    defaultMessage: 'Table',
  },
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Details',
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu',
  },
  help: {
    id: `${scope}.help`,
    defaultMessage: 'Help',
  },
  shopInfo: {
    id: `${scope}.shopInfo`,
    defaultMessage: 'Shop Info',
  },
});
