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
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  categoryContainer: {
    background: theme.mixins.tabs.background,
    color: theme.palette.primary.main,
  },
  expandButton: {
    color: theme.palette.primary.main,
  },
  popOverPaper: {
    background: theme.mixins.tabs.background,
    color: theme.palette.primary.main,
    maxHeight: '300px',
    overflow: 'scroll',
  },
  expandedMenu: {
    '&$selected': {
      backgroundColor: theme.mixins.expandedMenu.selected,
    },
  },
  selected: {},
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

  const [categoryStatus, setCategoryStatus] = useState('');

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSetAnchorEl = event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => !prev);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClose = event => {
    setAnchorEl(null);
    setOpen(false);
  };

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
        setCategory(categoriesResponse[0].pageId);
        if (categoriesResponse[0].status === 'DISABLED') {
          setCategoryStatus(categoriesResponse[0].status);
        } else {
          setCategoryStatus('');
        }
        const retrievedPage = await grabFromDb(
          hostName,
          `PluginMenu%23${categoriesResponse[0].pageId}`,
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
        `PluginMenu%23${categories[newValue].pageId}`,
      );
      return retrievedPage.menuItems;
    }

    setValue(newValue);
    setCategory(categories[newValue].pageId);
    if (categories[newValue].status === 'DISABLED') {
      setCategoryStatus(categories[newValue].status);
    } else {
      setCategoryStatus('');
    }
    requestMenuItems().then(items => {
      setMenuItems(items);
    });
    window.scrollTo({ top: 150, behavior: `smooth` });
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
          <Grid
            className={classes.categoryContainer}
            container
            alignItems="center"
            justify="center"
          >
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              <IconButton
                className={classes.expandButton}
                onClick={e => handleSetAnchorEl(e)}
                // aria-label="add page"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
            <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
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
            </Grid>
          </Grid>
        </AppBar>
        {maintenceMode && <UnderMaintenanceIllustration />}
        {categories && (
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={categories
              .map(e => e.pageId)
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
                        <Product
                          categoryStatus={categoryStatus}
                          item={menuItem}
                        />
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
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: -6,
          horizontal: 'left',
        }}
        PaperProps={{
          classes: { root: classes.popOverPaper },
        }}
      >
        <MenuList autoFocusItem={open} id="menu-list-grow">
          {categories &&
            categories.map((categoryItem, index) => (
              <MenuItem
                classes={{
                  root: classes.expandedMenu,
                  selected: classes.selected,
                }}
                key={categoryItem.id}
                selected={index === value}
                onClick={e => {
                  handleChange(e, index);
                  handleClose(e);
                }}
              >
                {categoryItem.name}
              </MenuItem>
            ))}
        </MenuList>
      </Popover>

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
