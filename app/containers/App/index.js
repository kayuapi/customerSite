/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect';
import MenuPage from 'containers/MenuPage/Loadable';
import DetailsPage from 'containers/DetailsPage/Loadable';
import ShopInfoPage from 'containers/ShopInfo/Loadable';

import AppBar from 'components/MyAppBar/Loadable';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import BottomNavigation from 'components/MyBottomNavigation/Loadable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { FULFILLMENT_METHODS } from '../DetailsPage/schema';
import reducer from '../DetailsPage/reducer';
import {
  makeSelectTableNumber,
  makeSelectPrefix,
} from '../DetailsPage/selectors';
import { CartProvider } from '../../context/Cart/CartProvider';
import { configureTableNumber, configurePrefix } from '../DetailsPage/actions';

import PopUpInfo from '../PopUpInfo';
// import GlobalStyle from '../../global-styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[700],
      dark: grey[900],
    },
    secondary: {
      main: grey[900],
    },
    background: {
      paper: '#fff',
      default: grey[300],
    },
  },
  mixins: {
    banner: {
      height: '150px',
    },
    productDisplay: {
      main: grey[200],
    },
    bottomNav: {
      background: '#fff',
      unselected: '#757575',
    },
    tabs: {
      background: '#f5f5f5',
    },
  },
  aLaCarteVariantPopUp: {
    table: {
      minWidth: 280,
    },
  },
  comboVariantPopUp: {
    dialog: {
      minWidth: 350,
    },
  },
});

// eslint-disable-next-line react/prop-types
const App = ({ runtime, fixTableNumber, fixPrefix, tableNumber, prefix }) => {
  const [popUpOpen, setPopUpOpen] = useState(true);
  // use "" as falsy value
  const [updateMessageFromVendor, setUpdateMessageFromVendor] = useState(false);
  useInjectReducer({ key: 'detailsPage', reducer });
  if (process.env.NODE_ENV === 'production') {
    runtime.install({
      onUpdateReady: () => {
        // console.log('onUpdateReady, cool');
        if (!popUpOpen) {
          setPopUpOpen(true);
        }
        setUpdateMessageFromVendor(true);
      },
      onUpdated: () => {
        // window.location.reload();
        if (
          prefix === FULFILLMENT_METHODS.DINE_IN ||
          prefix === FULFILLMENT_METHODS.SELF_PICKUP ||
          prefix === FULFILLMENT_METHODS.DELIVERY
        ) {
          window.location.href = `${
            window.location.href
          }?sctTable=${tableNumber}&sctFulfillmentMethod=${prefix}`;
        } else {
          window.location.reload();
        }
      },
    });
  }
  React.useEffect(() => {
    if (updateMessageFromVendor) {
      runtime.applyUpdate();
    }
  }, [updateMessageFromVendor]);
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefixTableNumber = params.get('sctTable');
    const prefixFulfillmentMethod = params.get('sctFulfillmentMethod');
    if (
      prefixFulfillmentMethod === FULFILLMENT_METHODS.DINE_IN ||
      prefixFulfillmentMethod === FULFILLMENT_METHODS.SELF_PICKUP ||
      prefixFulfillmentMethod === FULFILLMENT_METHODS.DELIVERY
    ) {
      fixPrefix(prefixFulfillmentMethod);
    }
    if (prefixFulfillmentMethod === FULFILLMENT_METHODS.DINE_IN) {
      fixTableNumber(prefixTableNumber);
    }
    window.history.replaceState(null, null, window.location.pathname);
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <CartProvider>
          <Switch>
            <Route exact path="/" component={MenuPage} />
            <Route exact path="/details" component={DetailsPage} />
            <Route exact path="/menu" component={MenuPage} />
            <Route exact path="/shopInfo" component={ShopInfoPage} />
          </Switch>
        </CartProvider>
        <PopUpInfo
          isOpen={popUpOpen}
          setPopUpOpen={setPopUpOpen}
          updateMessageFromVendor={updateMessageFromVendor}
          runtime={runtime}
        />
        <BottomNavigation />
        {/* <GlobalStyle /> */}
      </ThemeProvider>
    </div>
  );
};

App.propTypes = {
  runtime: PropTypes.object,
  fixTableNumber: PropTypes.func,
  fixPrefix: PropTypes.func,
  tableNumber: PropTypes.string,
  prefix: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tableNumber: makeSelectTableNumber(),
  prefix: makeSelectPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    fixTableNumber: tableNumber =>
      dispatch(configureTableNumber({ tableNumber })),
    fixPrefix: prefix => dispatch(configurePrefix({ prefix })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
