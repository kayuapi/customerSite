/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import { Auth } from '@aws-amplify/auth';
import API from '@aws-amplify/api';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

Auth.configure({
  identityPoolId: process.env.IDENTITIY_POOL_ID,
  region: 'ap-southeast-1',
});

API.configure({
  endpoints: [
    {
      name: 'amplifyChmboxOrderingApi',
      endpoint: process.env.MENU_PLUGIN_API,
      region: 'ap-southeast-1',
    },
  ],
  aws_appsync_region: 'ap-southeast-1',
  aws_appsync_graphqlEndpoint: process.env.GRAPHQL_API,
  aws_appsync_authenticationType: 'AWS_IAM',
});

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      // feel free to ask the user first
      // eslint-disable-next-line no-alert
      alert('This website is updated to the newest version!');
      window.location.reload();
    },
  });
}
