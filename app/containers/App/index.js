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

import MenuPage from 'containers/MenuPage/Loadable';
import DetailsPage from 'containers/DetailsPage/Loadable';
import ShopInfoPage from 'containers/ShopInfo/Loadable';

import AppBar from 'components/MyAppBar/Loadable';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { amber } from '@material-ui/core/colors';

import BottomNavigation from 'components/MyBottomNavigation/Loadable';
import PopUpInfo from '../PopUpInfo';
// import GlobalStyle from '../../global-styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: amber[50],
      main: amber[500],
      dark: amber[900],
    },
    secondary: {
      main: amber[900],
    },
    background: {
      paper: '#fff',
      default: amber[300],
    },
  },
  mixins: {
    banner: {
      height: '150px',
    },
    productDisplay: {
      main: amber[200],
    },
  },
});

// eslint-disable-next-line react/prop-types
export default function App({ runtime }) {
  const [popUpOpen, setPopUpOpen] = useState(true);
  // use "" as falsy value
  const [updateMessageFromVendor, setUpdateMessageFromVendor] = useState(false);
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
        window.location.reload();
      },
    });
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Switch>
          <Route exact path="/" component={MenuPage} />
          <Route exact path="/details" component={DetailsPage} />
          <Route exact path="/menu" component={MenuPage} />
          <Route exact path="/shopInfo" component={ShopInfoPage} />
        </Switch>
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
}
