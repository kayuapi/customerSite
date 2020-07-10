/**
 *
 * OrderPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { OrderedProduct } from 'containers/OrderedProduct';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import PaymentIcon from '@material-ui/icons/Payment';
import Fab from '@material-ui/core/Fab';

import { useInjectReducer } from 'utils/injectReducer';
import { selectChmtokenUid } from 'containers/TokenGuard/selectors';
import request from 'utils/request';
import makeSelectOrderPage from './selectors';
import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';


const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    width: '100%',
  //  backgroundColor: theme.palette.background.paper,
    'padding-bottom': '200px',
  },
  emptySpace: theme.mixins.gutters,
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
  },
}));

export function OrderPage() {

  useInjectReducer({ key: 'orderPage', reducer });
//  useInjectSaga({ key: 'orderPage', saga });
  const classes = useStyles();
  const chmtokenUid = useSelector(selectChmtokenUid);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const requestOrdersURL = `http://192.168.0.162:8000/orders/?chmtokenUid=${chmtokenUid}`;
  useEffect(() => {
    async function callApi() {
      try {
        const response = await request(requestOrdersURL);
        setOrders(response);
      } catch (e) {
        setError(e.message || 'Unexpected error');
      }
    }
    callApi();
    setLoading(false);
  }, []);

  return (
    <div>
      <Helmet>
        <title>OrderPage</title>
        <meta name="description" content="Description of OrderPage" />
      </Helmet>
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <Divider />
        <List>
          {orders.map((item, index) => (
            <OrderedProduct item={item} />
          ))}
        </List>
      </div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <PaymentIcon />
      </Fab>
    </div>
  );
}

OrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  orderPage: makeSelectOrderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderPage);
