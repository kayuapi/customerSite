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
import { FULFILLMENT_METHODS, PAYMENT_METHODS } from './schema';
import { makeSelectAddressFormSubmission } from './selectors';
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
    console.log('fullOrderToSubmit', fullOrderToSubmit);
    const { cartItems } = fullOrderToSubmit;
    const items = extractItemsFromCartItems(cartItems);
    console.log('checking', items);
    console.log('fullOrderToSubmit', JSON.stringify(fullOrderToSubmit));
    // submitOrders(fullOrderToSubmit);
    clearForm();
    handleNext();
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
                {fullOrderToSubmit.postScriptum}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <FormattedMessage {...messages.paymentDetails} />
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
