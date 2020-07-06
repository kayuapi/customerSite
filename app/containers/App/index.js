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

import AppBar from 'components/MyAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

import BottomNavigation from 'components/MyBottomNavigation';
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
    // background: {
    //   default: amber,
    //   // paper: amber,
    // },
  },
});

export default function App() {
  const [popUpOpen, setPopUpOpen] = useState(true);
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
        <PopUpInfo isOpen={popUpOpen} setPopUpOpen={setPopUpOpen} />
        <BottomNavigation />
        {/* <GlobalStyle /> */}
      </ThemeProvider>
    </div>
  );
}
