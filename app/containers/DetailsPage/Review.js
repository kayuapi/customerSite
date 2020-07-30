import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import request from 'utils/request';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { API, graphqlOperation } from '@aws-amplify/api';
import { FULFILLMENT_METHODS, PAYMENT_METHODS } from './schema';
import { makeSelectAddressFormSubmission } from './selectors';
import * as mutations from '../../graphql/mutations';
import {
  ccyFormat,
  priceRow,
  createRow,
  subtotal,
  createRowsForOrders,
} from '../CartPage';
import { resetForm } from './actions';
import messages from './messages';

const TAX_RATE = 0.00;

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export function Review({
  clearForm,
  fullOrderToSubmit,
  currentPage,
  handleNext,
  handleBack,
  numberOfPage,
}) {
  console.log('fullOrder', fullOrderToSubmit);
  const classes = useStyles();
  const { handleSubmit } = useForm();

  const submitOrdersURL = process.env.ORDER_API;

  async function submitOrders(orders) {
    try {
      const response = await request(submitOrdersURL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orders),
      });
    } catch (e) {
    }
  }

  function extractItemsFromCartItems(cartItems) {
    const items = cartItems.reduce((acc, obj) => {
      console.log('obj', obj);
      const key = `${obj.name}(${obj.variant})`;
      acc[key] = obj.quantity;
      return acc;
    }, {});
    return items;
  }

  // filter out empty string quantity

  const onSubmit = () => {
    const testData = {
      shopId: `${process.env.BUSINESS_NAME}`,
      fulfillmentMethod: fullOrderToSubmit.fulfillmentMethod,
      orderId: fullOrderToSubmit.orderNumber,
      status: 'UNFULFILLED',
      paymentMethod: `${
        typeof fullOrderToSubmit.paymentMethod === 'undefined'
          ? 'CASH'
          : fullOrderToSubmit.paymentMethod
      }`,
      postscript: `${
        typeof fullOrderToSubmit.postScript === 'undefined'
          ? null
          : fullOrderToSubmit.postScript
      }`,
      tableNumber: `${
        typeof fullOrderToSubmit.tableNumber === 'undefined'
          ? null
          : fullOrderToSubmit.tableNumber
      }`,
      firstName: `${
        typeof fullOrderToSubmit.firstName === 'undefined'
          ? null
          : fullOrderToSubmit.firstName
      }`,
      lastName: `${
        typeof fullOrderToSubmit.lastName === 'undefined'
          ? null
          : fullOrderToSubmit.lastName
      }`,
      phoneNumber: `${
        typeof fullOrderToSubmit.phoneNumber === 'undefined'
          ? '+60108001190'
          : fullOrderToSubmit.phoneNumber
      }`,
      // pickupDate: `${
      //   typeof fullOrderToSubmit.pickupDate === 'undefined'
      //     ? new Date().toISOString()
      //     : fullOrderToSubmit.pickupDate
      // }`,
      // pickupTime: `${
      //   typeof fullOrderToSubmit.pickupTime === 'undefined'
      //     ? new Date().toISOString()
      //     : fullOrderToSubmit.pickupTime
      // }`,
      vehiclePlateNumber: `${
        typeof fullOrderToSubmit.vehiclePlateNumber === 'undefined'
          ? null
          : fullOrderToSubmit.vehiclePlateNumber
      }`,
      // deliveryDate: `${
      //   typeof fullOrderToSubmit.deliveryDate === 'undefined'
      //     ? new Date().toISOString()
      //     : fullOrderToSubmit.deliveryDate
      // }`,
      // deliveryTime: `${
      //   typeof fullOrderToSubmit.deliveryTime === 'undefined'
      //     ? new Date().toISOString()
      //     : fullOrderToSubmit.deliveryTime
      // }`,
      deliveryAddress: `${
        typeof fullOrderToSubmit.deliveryAddress === 'undefined'
          ? null
          : fullOrderToSubmit.deliveryAddress
      }`,
      orderedItems: fullOrderToSubmit.cartItems.map(cartItem => ({
        name: cartItem.name,
        variant: cartItem.variant,
        quantity: cartItem.quantity,
      })),
    };
    API.graphql({
      query: mutations.createOrder,
      variables: { input: testData },
      authMode: 'AWS_IAM',
    }).then(res => {
      handleNext();
    });

    // submitOrders(fullOrderToSubmit);
    // clearForm();
  };
  const [rows, setRows] = useState([{ orders: [], uncommittedOrders: [] }]);
  const [invoice, setInvoice] = useState({ subtotal: 0, taxes: 0, total: 0 });
  useEffect(() => {
    const rows3 = createRowsForOrders(fullOrderToSubmit.cartItems);
    setRows(prevRows => ({ ...prevRows, orders: rows3 }));
  }, [fullOrderToSubmit.cartItems]);

  useEffect(() => {
    setInvoice({
      subtotal: subtotal(rows.orders),
      taxes: TAX_RATE * subtotal(rows.orders),
      total: subtotal(rows.orders) + TAX_RATE * subtotal(rows.orders),
    });
  }, [rows]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage {...messages.orderSummary} />
      </Typography>
      <List disablePadding>
        {rows.orders &&
          rows.orders.map(row => (
            <ListItem className={classes.listItem} key={row.desc}>
              <ListItemText
                primary={row.desc}
                secondary={
                  <FormattedMessage
                    values={{ quantity: row.qty }}
                    {...messages.quantity}
                  />
                }
              />
              <Typography variant="body2">RM {ccyFormat(row.price)}</Typography>
            </ListItem>
          ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary={<FormattedMessage {...messages.total} />} />
          <Typography variant="subtitle1" className={classes.total}>
            RM {ccyFormat(invoice.total)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <FormattedMessage {...messages.personalDetailsAndDeliveryMethod} />
          </Typography>
          <Typography gutterBottom>{fullOrderToSubmit.firstName}</Typography>
          <Typography gutterBottom>{fullOrderToSubmit.phoneNumber}</Typography>
          <Typography gutterBottom>
            {fullOrderToSubmit.fulfillmentMethod ===
              FULFILLMENT_METHODS.DINE_IN && (
              <FormattedMessage
                values={{
                  translated: <FormattedMessage {...messages.onPremise} />,
                }}
                {...messages.variableTranslate}
              />
            )}
            {fullOrderToSubmit.fulfillmentMethod ===
              FULFILLMENT_METHODS.SELF_PICKUP && (
              <FormattedMessage
                values={{
                  translated: <FormattedMessage {...messages.selfPickUp} />,
                }}
                {...messages.variableTranslate}
              />
            )}
            {fullOrderToSubmit.fulfillmentMethod ===
              FULFILLMENT_METHODS.DELIVERY && (
              <FormattedMessage
                values={{
                  translated: <FormattedMessage {...messages.delivery} />,
                }}
                {...messages.variableTranslate}
              />
            )}
          </Typography>
          {fullOrderToSubmit.fulfillmentMethod === FULFILLMENT_METHODS.DINE_IN && (
            <Typography gutterBottom>
              <FormattedMessage {...messages.tableNumber} /> :{' '}
              {fullOrderToSubmit.tableNumber}
            </Typography>
          )}
          {fullOrderToSubmit.fulfillmentMethod ===
            FULFILLMENT_METHODS.DELIVERY && (
            <Typography gutterBottom>
              {fullOrderToSubmit.deliveryAddress}
              <br />
              <FormattedMessage {...messages.deliveryDate} />:{' '}
              {fullOrderToSubmit.deliveryDate}
              <br />
              <FormattedMessage {...messages.deliveryTime} />:{' '}
              {fullOrderToSubmit.deliveryTime}
              <br />
            </Typography>
          )}
          {fullOrderToSubmit.fulfillmentMethod ===
            FULFILLMENT_METHODS.SELF_PICKUP && (
            <Typography gutterBottom>
              {fullOrderToSubmit.pickUpDate} <br />
              {fullOrderToSubmit.pickUpTime} <br />
              {fullOrderToSubmit.vehiclePlateNumber}
              {/* {pickUpDate}, {pickUpTime} */}
            </Typography>
          )}
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <FormattedMessage {...messages.postScriptum} />
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {fullOrderToSubmit.postScript}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {(fullOrderToSubmit.fulfillmentMethod ===
              FULFILLMENT_METHODS.DELIVERY ||
              fullOrderToSubmit.fulfillmentMethod ===
              FULFILLMENT_METHODS.SELF_PICKUP) && (
              <FormattedMessage {...messages.paymentDetails} />
            )}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {fullOrderToSubmit.paymentMethod === PAYMENT_METHODS.COD && (
                  <FormattedMessage
                    values={{
                      translated: (
                        <FormattedMessage {...messages.cashOnDelivery} />
                      ),
                    }}
                    {...messages.variableTranslate}
                  />
                )}
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.ONLINE_BANKING && (
                  <FormattedMessage
                    values={{
                      translated: (
                        <FormattedMessage {...messages.onlineBanking} />
                      ),
                    }}
                    {...messages.variableTranslate}
                  />
                )}
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.E_WALLET && (
                  <FormattedMessage
                    values={{
                      translated: <FormattedMessage {...messages.eWallet} />,
                    }}
                    {...messages.variableTranslate}
                  />
                )}
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.E_WALLET_TOUCH_N_GO && (
                  <FormattedMessage
                    values={{
                      translated: (
                        <FormattedMessage {...messages.eWalletTouchNGo} />
                      ),
                    }}
                    {...messages.variableTranslate}
                  />
                )}
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.E_WALLET_BOOST && (
                  <FormattedMessage
                    values={{
                      translated: (
                        <FormattedMessage {...messages.eWalletBoost} />
                      ),
                    }}
                    {...messages.variableTranslate}
                  />
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.buttons}>
            {currentPage !== 0 && (
              <Button onClick={handleBack} className={classes.button}>
                <FormattedMessage {...messages.back} />
              </Button>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                {currentPage === numberOfPage - 1 ? (
                  <FormattedMessage {...messages.placeOrder} />
                ) : (
                  <FormattedMessage {...messages.next} />
                )}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  clearForm: PropTypes.func.isRequired,
  fullOrderToSubmit: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  numberOfPage: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fullOrderToSubmit: makeSelectAddressFormSubmission(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearForm: () => dispatch(resetForm()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Review);
