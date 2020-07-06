import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectPaymentMethod } from './selectors';
import { configurePaymentMethod } from './actions';
import { PAYMENT_METHODS } from './schema';

import messages from './messages';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export function PaymentForm({
  paymentMethod,
  // eslint-disable-next-line no-shadow
  configurePaymentMethod,
  currentPage,
  handleNext,
  handleBack,
  numberOfPage,
}) {
  const classes = useStyles();
  const { handleSubmit, control } = useForm({ paymentMethod });
  const onSubmit = data => {
    configurePaymentMethod(data);
    handleNext();
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage {...messages.paymentMethods} />
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              as={
                <Select fullWidth>
                  <MenuItem value={PAYMENT_METHODS.COD}>
                    <FormattedMessage {...messages.cashOnDelivery} />
                  </MenuItem>
                  <MenuItem value={PAYMENT_METHODS.E_WALLET}>
                    <FormattedMessage {...messages.eWallet} />
                  </MenuItem>
                </Select>
              }
              control={control}
              rules={{ required: true }}
              name="paymentMethod"
              defaultValue={paymentMethod}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              {currentPage !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  <FormattedMessage {...messages.back} />
                </Button>
              )}
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
            </div>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}


PaymentForm.propTypes = {
  paymentMethod: PropTypes.string.isRequired,

  configurePaymentMethod: PropTypes.func.isRequired,

  currentPage: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  numberOfPage: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  paymentMethod: makeSelectPaymentMethod(),
});

function mapDispatchToProps(dispatch) {
  return {
    configurePaymentMethod: ({ ...paymentMethod }) =>
      dispatch(configurePaymentMethod({ ...paymentMethod })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PaymentForm);
