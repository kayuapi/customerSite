import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import Loading from 'components/LoadingIndicator';

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.chmtoken.uid !== false,
  authenticatingSelector: state => state.chmtoken.isVerifying,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults,
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/notvalid',
});
