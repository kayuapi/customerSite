/**
 *
 * MenuPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { WidthProvider, Responsive } from "react-grid-layout";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import request from 'utils/request';
import Badge from '@material-ui/core/Badge';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import API from '@aws-amplify/api';
import { openCart } from '../CartPage/actions';
import Product from '../Product';
import makeSelectMenuPage from './selectors';
import { makeSelectTotalProductsQuantity } from '../Product/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CartPage from '../CartPage';

const TAX_RATE = 0.07;
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme => ({
  badge: {
    width: 'max-content',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'center',
  },
  toolbar: {
    minHeight: '150px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    // position: 'fix',
    // bottom: theme.spacing(10),
    // right: theme.spacing(2),
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(10),
    left: 'auto',
    position: 'fixed',
    // backgroundColor: theme.palette.primary.light,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    'flex-basis': '50%',
  },
  root: {
    background: theme.palette.background.default,
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: '#ffd54f',
    bottom: theme.spacing(10),
  },
  table: {
    minWidth: 300,
  },
  tablecell: {
    fontSize: '8pt',
  },
  footer: {
    fontSize: '8pt',
    position: 'sticky -webkit-sticky',
    bottom: 0,
    zIndex: '-1',
    height: '80px',
    backgroundColor: 'white',
    color: 'black',
    // textShadow: '2px 2px black',
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
      {value === index && <Box p={3}>{children}</Box>}
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

export function MenuPage({ openCart2, quantityOfInCartProducts }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    openCart2();
  };
  const handleClose = () => {
    setOpen(false);
  };

  useInjectReducer({ key: 'menuPage', reducer });
//  useInjectSaga({ key: 'menuPage', saga });

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function grabFromDb(hostName, item) {
    // await Auth.currentCredentials;
    const apiName = 'amplifyChmboxOrderingApi';
    const basePath = '/uiplugin/object';
    try {
      const myInit = {
        headers: {},
        response: false,
      };
      const path = `${basePath}/${hostName}/${item}`;
      const retrievedItem = await API.get(apiName, path, myInit);
      return retrievedItem;
    } catch (err) {
      return { error: 'error' };
    }
  }

  // load categories
  useEffect(() => {
    async function requestCategories() {
      const hostName = process.env.BUSINESS_NAME;
      const retrievedPages = await grabFromDb(hostName, 'PluginMenuPages');
      const { categories } = retrievedPages;
      setCategories(categories);
      setCategory(categories[0].name);
      const retrievedPage = await grabFromDb(
        hostName,
        `PluginMenu%23${categories[0].name}`,
      );
      const { menuItems } = retrievedPage;
      console.log('retrievedPage', retrievedPage);
      if (menuItems) {
        setMenuItems(() => [...menuItems]);
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
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            {console.log('categories length', categories.length)}
            {console.log('cateogry', category)}
            {console.log('test', categories.map(e=>e.name).indexOf(category))}
            {categories.length &&
              categories.map((el, index) => (
                <Tab key={el.id} label={el.name} {...a11yProps(index)} />
              ))}
          </Tabs>
        </AppBar>
        <TabPanel
          value={value}
          index={categories
            .map(e => e.name)
            // .map(n => n.name)
            .indexOf(category)}
        >
          <Container className={classes.cardGrid} maxWidth="sm">
            <div style={{ position: 'relative' }}>
              <ResponsiveReactGridLayout
                // onLayoutChange={onLayoutChange}
                // layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
                // onBreakpointChange={this.onBreakpointChange}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
                isDraggable={false}
                draggableCancel="input,textarea, button"
                isResizable={false}
                rowHeight={150}
                className="layout"
              >
                {menuItems.map((menuItem, id) => (
                  <div key={menuItem.id} data-grid={menuItem.uiLocation}>
                    <Product key={menuItem.name} id={id} item={menuItem} />
                  </div>
                ))}
              </ResponsiveReactGridLayout>
            </div>
            {/* <Grid container spacing={2}>
              {menuItems && menuItems.map((menuItem, id) => {
                return (
                  <Product key={menuItem.name} id={id} item={menuItem} />
                );
              })}
            </Grid> */}
          </Container>
        </TabPanel>
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
          badgeContent={quantityOfInCartProducts}
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
  uncommittedOrders: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  menuPage: makeSelectMenuPage(),
  quantityOfInCartProducts: makeSelectTotalProductsQuantity(),
});

function mapDispatchToProps(dispatch) {
  return {
    openCart2: () => dispatch(openCart()),
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
