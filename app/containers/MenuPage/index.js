/**
 *
 * MenuPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';

import { useInjectReducer } from 'utils/injectReducer';
import API from '@aws-amplify/api';
import CircularProgress from '../../components/LoadingIndicator';
import { openCart } from '../CartPage/actions';
import Product from '../Product';
import makeSelectMenuPage from './selectors';
import reducer from './reducer';
import messages from './messages';
import CartPage from '../CartPage/Loadable';
import UnderMaintenanceIllustration from './UnderMaintenance';
import { useCart } from '../../context/Cart';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme => ({
  badge: {
    width: '4ch',
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  tabs: {
    background: theme.mixins.tabs.background,
    color: theme.palette.primary.main,
  },
  tabPanel: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  toolbar: {
    minHeight: theme.mixins.banner.height,
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(10),
    left: 'auto',
    position: 'fixed',
  },
  root: {
    background: theme.palette.background.default,
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  footer: {
    fontSize: '8pt',
    position: 'sticky -webkit-sticky',
    bottom: 0,
    zIndex: '-1',
    height: '80px',
    backgroundColor: theme.palette.background.default,
    color: 'black',
    padding: '5px 0',
    textAlign: 'center',
  },
  bottompad: {
    height: '80px',
    backgroundColor: theme.palette.background.default,
    color: 'black',
    padding: '5px 0',
    textAlign: 'center',
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0} mt={1}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  key: PropTypes.any,
};

// eslint-disable-next-line no-shadow
export function MenuPage({ openCart }) {
  const classes = useStyles();

  const handleClickOpen = () => {
    openCart();
  };

  useInjectReducer({ key: 'menuPage', reducer });
  const [categories, setCategories] = useState(false);
  const [category, setCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [maintenceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  async function grabFromDb(hostName, item) {
    // await Auth.currentCredentials;
    const apiName = 'amplifyChmboxOrderingApi';
    const basePath = '/uiplugin/object';
    try {
      const myInit = {
        headers: {},
        response: false,
      };
      const path = `${basePath}/${hostName}/${encodeURIComponent(item)}`;
      const retrievedItem = await API.get(apiName, path, myInit);
      return retrievedItem;
    } catch (err) {
      return { error: 'error' };
    }
  }
  const { cartItems } = useCart();
  const quantityInCart = cartItems
    .map(({ quantity }) => quantity)
    .reduce((a, b) => a + b, 0);
  // load categories
  useEffect(() => {
    async function requestCategories() {
      const hostName = process.env.BUSINESS_NAME;
      const retrievedPages = await grabFromDb(hostName, 'PluginMenuPages');
      const { categories: categoriesResponse } = retrievedPages;
      if (categoriesResponse) {
        setCategories(categoriesResponse);
        setCategory(categoriesResponse[0].name);
        const retrievedPage = await grabFromDb(
          hostName,
          `PluginMenu%23${categoriesResponse[0].name}`,
        );
        const { menuItems: menuItemsResponse } = retrievedPage;
        if (menuItemsResponse) {
          setMenuItems(() => [...menuItemsResponse]);
        }
      } else {
        setMaintenanceMode(true);
      }
    }
    requestCategories();
    setLoading(false);
  }, []);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    async function requestMenuItems() {
      const hostName = process.env.BUSINESS_NAME;
      const retrievedPage = await grabFromDb(
        hostName,
        `PluginMenu%23${categories[newValue].name}`,
      );
      return retrievedPage.menuItems;
    }

    setValue(newValue);
    setCategory(categories[newValue].name);
    requestMenuItems().then(items => {
      setMenuItems(items);
    });
  };

  return (
    <div>
      <Helmet>
        <title>MenuPage</title>
        <meta name="description" content="Description of MenuPage" />
      </Helmet>
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            className={classes.tabs}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            {categories &&
              categories.map((el, index) => (
                <Tab key={el.id} label={el.name} {...a11yProps(index)} />
              ))}
          </Tabs>
        </AppBar>
        {maintenceMode && <UnderMaintenanceIllustration />}
        {categories && (
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={categories
              .map(e => e.name)
              // .map(n => n.name)
              .indexOf(category)}
          >
            <Container className={classes.cardGrid} maxWidth="sm">
              {loading && <CircularProgress />}
              {!loading && (
                <div style={{ position: 'relative' }}>
                  <ResponsiveReactGridLayout
                    // onLayoutChange={onLayoutChange}
                    // layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
                    // onBreakpointChange={this.onBreakpointChange}
                    breakpoints={{
                      lg: 1200,
                      md: 996,
                      sm: 768,
                      xs: 480,
                      xxs: 0,
                    }}
                    cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
                    isDraggable={false}
                    draggableCancel="input,textarea, button"
                    isResizable={false}
                    rowHeight={1}
                    className="layout"
                    margin={[0, 0]}
                    compactType={null}
                  >
                    {menuItems.map(menuItem => (
                      <div key={menuItem.id} data-grid={menuItem.uiLocation}>
                        <Product item={menuItem} />
                      </div>
                    ))}
                  </ResponsiveReactGridLayout>
                </div>
              )}
            </Container>
          </TabPanel>
        )}
        <div className={classes.bottompad} />
        <footer className={classes.footer}>
          <FormattedMessage {...messages.poweredBy} />
        </footer>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
        id="testing"
      >
        <Badge
          classes={{ badge: classes.badge }}
          badgeContent={quantityInCart}
          color="secondary"
        >
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      <CartPage />
    </div>
  );
}

MenuPage.propTypes = {
  openCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menuPage: makeSelectMenuPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    openCart: () => dispatch(openCart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MenuPage);
