/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { API } from '@aws-amplify/api';
import { FULFILLMENT_METHODS, PAYMENT_METHODS } from './schema';
import { makeSelectAddressFormSubmission } from './selectors';
import * as mutations from '../../graphql/mutations';
import ErrorPopUp from '../../components/ErrorPopUp';
import { useCart } from '../../context/Cart';
import { ccyFormat, subtotalFunc } from '../CartPage';
import { resetForm, configureOrderNumber } from './actions';
import { clearProductFromCart } from '../Product/actions';
import messages from './messages';

const TAX_RATE = 0.0;

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
  price: {
    minWidth: '12ch',
    textAlign: 'right',
  },
}));

const cleanNullAndUndefined = obj => {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i += 1) {
    const propName = propNames[i];
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === []
    ) {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName];
    }
  }
  return obj;
};

function getLocalISODateString(date) {
  const offset = date.getTimezoneOffset();
  const offsetAbs = Math.abs(offset);
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString();
  return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(
    Math.floor(offsetAbs / 60),
  ).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`.replace(
    /T.*/,
    '',
  );
}

export function Review({
  clearForm,
  clearCart,
  // eslint-disable-next-line no-shadow
  configureOrderNumber,
  fullOrderToSubmit,
  currentPage,
  handleNext,
  handleBack,
  numberOfPage,
}) {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const { cartItems } = useCart();
  const onSubmit = () => {
    try {
      if (cartItems.length === 0) {
        throw new Error('EmptyOrderError');
      }
      const orderId = String(
        new Date().getTime() +
          Math.random()
            .toString(36)
            .substring(2, 4),
      );
      let toSubmitData = {
        shopId: `${process.env.BUSINESS_NAME}`,
        fulfillmentMethod: fullOrderToSubmit.fulfillmentMethod,
        orderId,
        status: 'UNFULFILLED',
        paymentMethod:
          typeof fullOrderToSubmit.paymentMethod === 'undefined'
            ? 'CASH'
            : fullOrderToSubmit.paymentMethod,
        postscript:
          typeof fullOrderToSubmit.postScript === 'undefined'
            ? null
            : fullOrderToSubmit.postScript,
        tableNumber:
          typeof fullOrderToSubmit.tableNumber === 'undefined'
            ? null
            : fullOrderToSubmit.tableNumber,
        firstName:
          typeof fullOrderToSubmit.firstName === 'undefined'
            ? null
            : fullOrderToSubmit.firstName,
        lastName:
          typeof fullOrderToSubmit.lastName === 'undefined'
            ? null
            : fullOrderToSubmit.lastName,
        phoneNumber:
          typeof fullOrderToSubmit.phoneNumber === 'undefined'
            ? null
            : `+6${fullOrderToSubmit.phoneNumber}`,
        pickupDate:
          typeof fullOrderToSubmit.pickUpDate === 'undefined'
            ? null
            : getLocalISODateString(new Date(fullOrderToSubmit.pickUpDate)),
        pickupTime:
          typeof fullOrderToSubmit.pickUpTime === 'undefined'
            ? null
            : new Date(fullOrderToSubmit.pickUpTime)
              .toISOString()
              .match(/\d\d:\d\d:\d\d.\d\d\dZ/)[0],
        vehiclePlateNumber:
          typeof fullOrderToSubmit.vehiclePlateNumber === 'undefined'
            ? null
            : fullOrderToSubmit.vehiclePlateNumber,
        deliveryDate:
          typeof fullOrderToSubmit.deliveryDate === 'undefined'
            ? null
            : getLocalISODateString(new Date(fullOrderToSubmit.deliveryDate)),
        deliveryTime:
          typeof fullOrderToSubmit.deliveryTime === 'undefined'
            ? null
            : new Date(fullOrderToSubmit.deliveryTime)
              .toISOString()
              .match(/\d\d:\d\d:\d\d.\d\d\dZ/)[0],
        deliveryAddress:
          typeof fullOrderToSubmit.deliveryAddress === 'undefined' ||
          fullOrderToSubmit.deliveryAddress === ''
            ? null
            : fullOrderToSubmit.deliveryAddress,
        orderedItems: cartItems.map(cartItem => ({
          name: cartItem.name,
          variant:
            cartItem.variant && typeof cartItem.variant === 'object'
              ? JSON.stringify(cartItem.variant).replace(/["']/g, '')
              : cartItem.variant,
          quantity: cartItem.quantity,
        })),
      };
      toSubmitData = cleanNullAndUndefined(toSubmitData);
      // const windowReference = window.open('', '_self');
      // if (toSubmitData.phoneNumber) {
      //   const textToSend = encodeURIComponent(
      //     `===
      //     Notification to shop
      //     ===
      //     My order number is ${toSubmitData.orderId}.
      //     `,
      //   );
      //   window.open(
      //     `https://wa.me/${toSubmitData.phoneNumber}?text=${textToSend}`,
      //   );
      // }
      API.graphql({
        query: mutations.createOrder,
        variables: { input: toSubmitData },
        authMode: 'AWS_IAM',
      })
        .then(res => {
          // eslint-disable-next-line no-empty
          if (res) {

          }
          configureOrderNumber({ orderNumber: orderId });
          handleNext();
          // if (
          //   toSubmitData.fulfillmentMethod === FULFILLMENT_METHODS.DELIVERY ||
          //   toSubmitData.fulfillmentMethod === FULFILLMENT_METHODS.SELF_PICKUP
          // ) {
          //   const textToSend = encodeURIComponent(
          //     intl.formatMessage(messages.whatsappNotification, {
          //       linebreak: '\r\n',
          //       orderNumber: orderId,
          //     }),
          //   );
          //   // const textToSend = encodeURIComponent(
          //   //   '***Click send to notify the shop about this order.***\r\n' +
          //   //     `Order number: ${toSubmitData.orderId}.`,
          //   // );
          //   windowReference.location = `https://wa.me/${
          //     process.env.SHOP_INFO_BUSINESS_PHONE_NUMBER
          //   }?text=${textToSend}`;
          //   // windowReference.close();
          //   // window.open(
          //   //   `https://wa.me/${toSubmitData.phoneNumber}?text=${textToSend}`,
          //   // );
          // }
          clearForm();
          clearCart();
        })
        .catch(err => {
          setIsErrorPopUpOpen(true);
          setErrorMessage(err.errors[0].message);
        });
    } catch (err) {
      if (err.message === 'EmptyOrderError') {
        setIsErrorPopUpOpen(true);
        setErrorMessage(err.message);
      }
    }
  };
  const [isErrorPopUpOpen, setIsErrorPopUpOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [invoice, setInvoice] = useState({ subtotal: 0, taxes: 0, total: 0 });

  useEffect(() => {
    // console.log('cartItems CHANGE', cartItems);
    setInvoice({
      subtotal: subtotalFunc(cartItems),
      taxes: TAX_RATE * subtotalFunc(cartItems),
      total: subtotalFunc(cartItems) + TAX_RATE * subtotalFunc(cartItems),
    });
  }, [cartItems]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage {...messages.orderSummary} />
      </Typography>
      <List disablePadding>
        {cartItems &&
          cartItems.map(item => {
            let variantName = '';
            if (item.variant) {
              variantName = JSON.stringify(item.variant)
                .replace(/["']/g, '')
                .replace(/[,]/g, '\n');
            }
            return (
              <ListItem className={classes.listItem} key={item.id}>
                <ListItemText
                  disableTypography
                  primary={
                    <>
                      <Typography>{item.name}</Typography>
                      <Typography style={{ fontSize: '0.7rem' }}>
                        <span>
                          {variantName.split('\n').map((el, key) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={key}>
                              {el}
                              <br />
                            </Fragment>
                          ))}
                        </span>
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography variant="subtitle2" color="textSecondary">
                      <FormattedMessage
                        values={{ quantity: item.quantity }}
                        {...messages.quantity}
                      />
                    </Typography>
                  }
                />
                <Typography variant="body2" className={classes.price}>
                  RM {ccyFormat(item.subtotal)}
                </Typography>
              </ListItem>
            );
          })}
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
          {fullOrderToSubmit.fulfillmentMethod ===
            FULFILLMENT_METHODS.DINE_IN && (
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
              {new Date(fullOrderToSubmit.deliveryDate).toLocaleDateString()}
              <br />
              <FormattedMessage {...messages.reviewDeliveryTime} />:{' '}
              {new Date(fullOrderToSubmit.deliveryTime).toLocaleTimeString(
                'en-UK',
              )}
              <br />
            </Typography>
          )}
          {fullOrderToSubmit.fulfillmentMethod ===
            FULFILLMENT_METHODS.SELF_PICKUP && (
            <Typography gutterBottom>
              <FormattedMessage {...messages.pickUpDate} />:{' '}
              {new Date(fullOrderToSubmit.pickUpDate).toLocaleDateString()}
              <br />
              <FormattedMessage {...messages.reviewPickUpTime} />:{' '}
              {new Date(fullOrderToSubmit.pickUpTime).toLocaleTimeString(
                'en-UK',
              )}
              <br />
              <FormattedMessage {...messages.vehiclePlateNumber} />:{' '}
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
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.GRABPAY && (
                  <FormattedMessage
                    values={{
                      translated: <FormattedMessage {...messages.grabpay} />,
                    }}
                    {...messages.variableTranslate}
                  />
                )}
                {fullOrderToSubmit.paymentMethod ===
                  PAYMENT_METHODS.FAVEPAY && (
                  <FormattedMessage
                    values={{
                      translated: <FormattedMessage {...messages.favepay} />,
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
                {currentPage === numberOfPage - 1 &&
                  fullOrderToSubmit.fulfillmentMethod ===
                    FULFILLMENT_METHODS.DELIVERY && (
                  <FormattedMessage
                    {...messages.placeOrderAndWhatsappNotify}
                  />
                )}
                {currentPage === numberOfPage - 1 &&
                  fullOrderToSubmit.fulfillmentMethod ===
                    FULFILLMENT_METHODS.SELF_PICKUP && (
                  <FormattedMessage
                    {...messages.placeOrderAndWhatsappNotify}
                  />
                )}
                {currentPage === numberOfPage - 1 &&
                  fullOrderToSubmit.fulfillmentMethod ===
                    FULFILLMENT_METHODS.DINE_IN && (
                  <FormattedMessage {...messages.placeOrder} />
                )}
                {currentPage !== numberOfPage - 1 && (
                  <FormattedMessage {...messages.next} />
                )}
                {/* {currentPage === numberOfPage - 1 ? (
                  <FormattedMessage {...messages.placeOrder} />
                ) : (
                  <FormattedMessage {...messages.next} />
                )} */}
              </Button>
            </form>
          </div>
        </Grid>
        <ErrorPopUp
          open={isErrorPopUpOpen}
          setOpen={setIsErrorPopUpOpen}
          message={errorMessage}
        />
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  clearForm: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  configureOrderNumber: PropTypes.func.isRequired,
  fullOrderToSubmit: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  numberOfPage: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fullOrderToSubmit: makeSelectAddressFormSubmission(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearForm: () => dispatch(resetForm()),
    clearCart: () => dispatch(clearProductFromCart()),
    configureOrderNumber: orderNumber =>
      dispatch(configureOrderNumber(orderNumber)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(Review);
