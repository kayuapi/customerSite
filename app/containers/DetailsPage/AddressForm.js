import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers';
import {
  makeSelectFulfillmentMethod,
  makeSelectFulfillmentDerivatives,
  makeSelectPostScript,
  makeSelectPaymentMethod,
} from './selectors';
import {
  configureFulfillmentMethod,
  configureFulfillmentDerivatives,
  configurePostScript,
  configurePaymentMethod,
} from './actions';

import 'date-fns';
import messages from './messages';

import { FULFILLMENT_METHODS, PAYMENT_METHODS } from './schema';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: '100px',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: '50px',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    minHeight: '600px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

export function AddressForm({
  fulfillmentMethod,
  fulfillmentDerivatives,
  postScript,
  paymentMethod,
  // eslint-disable-next-line no-shadow
  configureFulfillmentMethod,
  // eslint-disable-next-line no-shadow
  configureFulfillmentDerivatives,
  // eslint-disable-next-line no-shadow
  configurePostScript,
  // eslint-disable-next-line no-shadow
  configurePaymentMethod,
  currentPage,
  handleNext,
  handleBack,
  numberOfPage,
}) {
  const classes = useStyles();
  const formUIState = {
    fulfillmentMethod,
    ...fulfillmentDerivatives,
    postScript,
    paymentMethod,
  };
  const { handleSubmit, watch, control, register, errors } = useForm({
    formUIState,
  });
  const watchDeliveryOption = watch('fulfillmentMethod', fulfillmentMethod);
  const onSubmit = data => {
    const {
      fulfillmentMethod: submittedFulfillmentMethod,
      postScript: submittedPostscript,
      paymentMethod: submittedPaymentMethod,
      // eslint-disable-next-line no-shadow
      ...fulfillmentDerivatives
    } = data;
    configurePostScript(submittedPostscript);
    configureFulfillmentMethod(submittedFulfillmentMethod);
    configureFulfillmentDerivatives(fulfillmentDerivatives);
    configurePaymentMethod(submittedPaymentMethod);
    handleNext();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <FormattedMessage {...messages.fulfillmentMethods} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={
                <Select fullWidth>
                  <MenuItem value={FULFILLMENT_METHODS.DINE_IN}>
                    <FormattedMessage {...messages.onPremise} />
                  </MenuItem>
                  <MenuItem value={FULFILLMENT_METHODS.SELF_PICKUP}>
                    <FormattedMessage {...messages.selfPickUp} />
                  </MenuItem>
                  <MenuItem value={FULFILLMENT_METHODS.DELIVERY}>
                    <FormattedMessage {...messages.delivery} />
                  </MenuItem>
                </Select>
              }
              control={control}
              rules={{ required: true }}
              name="fulfillmentMethod"
              defaultValue={fulfillmentMethod}
            />
          </Grid>

          {watchDeliveryOption === FULFILLMENT_METHODS.SELF_PICKUP && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage {...messages.personalInformation} />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={typeof errors.firstName !== 'undefined'}
                  helperText={<FormattedMessage {...messages.firstNameError} />}
                  inputRef={register({ required: true, maxLength: 80 })}
                  name="firstName"
                  label={<FormattedMessage {...messages.firstName} />}
                  fullWidth
                  defaultValue={fulfillmentDerivatives.firstName}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.phoneNumber !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.phoneNumberError} />
                  }
                  inputRef={register({ required: true, maxLength: 12 })}
                  name="phoneNumber"
                  label={<FormattedMessage {...messages.phoneNumber} />}
                  fullWidth
                  type="tel"
                  defaultValue={fulfillmentDerivatives.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={typeof errors.vehiclePlateNumber !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.vehiclePlateNumberError} />
                  }
                  inputRef={register({ required: true, maxLength: 20 })}
                  name="vehiclePlateNumber"
                  label={<FormattedMessage {...messages.vehiclePlateNumber} />}
                  fullWidth
                  defaultValue={fulfillmentDerivatives.vehiclePlateNumber}
                  type="text"
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <Controller
                    as={
                      <DatePicker
                        style={{ width: '100%' }}
                        margin="normal"
                        label={<FormattedMessage {...messages.pickUpDate} />}
                        format="dd/MM/yyyy"
                        disablePast
                        minDate={
                          new Date(new Date().setDate(new Date().getDate()))
                        }
                        minDateMessage={
                          <FormattedMessage {...messages.dateError} />
                        }
                        // value={selectedDate}
                        // onChange={handleDateChange}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    // value={watch('datePick')}
                    // onChange={date => console.log(typeof(date[1]))}
                    name="pickUpDate"
                    // onChange={([date]) => date}
                    //onChange={date => setValue('datePick', date[1])}
                    // defaultValue={defaultAddressForm.pickUpDate}
                    defaultValue={
                      new Date()
                      // new Date(new Date().setDate(new Date().getDate()))
                    }
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    as={
                      <TimePicker
                        style={{ width: '100%' }}
                        margin="normal"
                        label={<FormattedMessage {...messages.pickUpTime} />}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change time',
                        // }}
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    name="pickUpTime"
                    minutesStep={15}
                    // defaultValue={defaultAddressForm.pickUpTime}
                    defaultValue={new Date()}
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid> */}
              </MuiPickersUtilsProvider>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.postScript !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.postScriptumError} />
                  }
                  inputRef={register({ maxLength: 50 })}
                  name="postScript"
                  label={<FormattedMessage {...messages.postScriptum} />}
                  fullWidth
                  type="text"
                  defaultValue={postScript}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage {...messages.paymentMethods} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={
                    <Select fullWidth>
                      <MenuItem value={PAYMENT_METHODS.COD}>
                        <FormattedMessage {...messages.cashOnDelivery} />
                      </MenuItem>
                      <MenuItem value={PAYMENT_METHODS.ONLINE_BANKING}>
                        <FormattedMessage {...messages.onlineBanking} />
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
            </>
          )}

          {watchDeliveryOption === FULFILLMENT_METHODS.DINE_IN && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage {...messages.tableNumber} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.tableNumber !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.tableNumberError} />
                  }
                  inputRef={register({ required: true, maxLength: 12 })}
                  name="tableNumber"
                  autoComplete="off"
                  label={<FormattedMessage {...messages.tableNumber} />}
                  fullWidth
                  type="text"
                  defaultValue={fulfillmentDerivatives.tableNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.postScript !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.postScriptumError} />
                  }
                  inputRef={register({ maxLength: 50 })}
                  name="postScript"
                  label={<FormattedMessage {...messages.postScriptum} />}
                  fullWidth
                  type="text"
                  defaultValue={postScript}
                />
              </Grid>
            </>
          )}

          {watchDeliveryOption === FULFILLMENT_METHODS.DELIVERY && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage {...messages.personalInformation} />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={typeof errors.firstName !== 'undefined'}
                  helperText={<FormattedMessage {...messages.firstNameError} />}
                  inputRef={register({ required: true, maxLength: 80 })}
                  name="firstName"
                  label={<FormattedMessage {...messages.firstName} />}
                  fullWidth
                  defaultValue={fulfillmentDerivatives.firstName}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.phoneNumber !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.phoneNumberError} />
                  }
                  inputRef={register({ required: true, maxLength: 12 })}
                  name="phoneNumber"
                  label={<FormattedMessage {...messages.phoneNumber} />}
                  fullWidth
                  type="tel"
                  defaultValue={fulfillmentDerivatives.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={typeof errors.addressLine1 !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.addressLine1Error} />
                  }
                  inputRef={register({ required: true, maxLength: 50 })}
                  name="addressLine1"
                  label={<FormattedMessage {...messages.addressLine1} />}
                  fullWidth
                  defaultValue={fulfillmentDerivatives.addressLine1}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={typeof errors.addressLine2 !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.addressLine2Error} />
                  }
                  inputRef={register({ maxLength: 50 })}
                  name="addressLine2"
                  label={<FormattedMessage {...messages.addressLine2} />}
                  fullWidth
                  defaultValue={fulfillmentDerivatives.addressLine2}
                  type="text"
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <Controller
                    as={
                      <DatePicker
                        style={{ width: '100%' }}
                        margin="normal"
                        label={<FormattedMessage {...messages.deliveryDate} />}
                        format="dd/MM/yyyy"
                        disablePast
                        minDate={
                          new Date(new Date().setDate(new Date().getDate()))
                        }
                        minDateMessage={
                          <FormattedMessage {...messages.dateError} />
                        }
                        // value={selectedDate}
                        // onChange={handleDateChange}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    // value={watch('datePick')}
                    // onChange={date => console.log(typeof(date[1]))}
                    name="deliveryDate"
                    // onChange={([date]) => date}
                    //onChange={date => setValue('datePick', date[1])}
                    // defaultValue={defaultAddressForm.pickUpDate}
                    defaultValue={
                      new Date()
                      // new Date(new Date().setDate(new Date().getDate()))
                    }
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    as={
                      <TimePicker
                        margin="normal"
                        style={{ width: '100%' }}
                        label={<FormattedMessage {...messages.deliveryTime} />}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change time',
                        // }}
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    name="deliveryTime"
                    minutesStep={15}
                    // defaultValue={defaultAddressForm.pickUpTime}
                    defaultValue={new Date()}
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid> */}
              </MuiPickersUtilsProvider>
              <Grid item xs={12}>
                <TextField
                  error={typeof errors.postScript !== 'undefined'}
                  helperText={
                    <FormattedMessage {...messages.postScriptumError} />
                  }
                  inputRef={register({ maxLength: 50 })}
                  name="postScript"
                  label={<FormattedMessage {...messages.postScriptum} />}
                  fullWidth
                  type="text"
                  defaultValue={postScript}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage {...messages.paymentMethods} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  as={
                    <Select fullWidth>
                      <MenuItem value={PAYMENT_METHODS.COD}>
                        <FormattedMessage {...messages.cashOnDelivery} />
                      </MenuItem>
                      <MenuItem value={PAYMENT_METHODS.ONLINE_BANKING}>
                        <FormattedMessage {...messages.onlineBanking} />
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
            </>
          )}






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
                // onClick={handleNext}
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

          {/*
          <Input fullWidth inputRef={register} name="input" />

          <Button type="button" onClick={() => reset({ defaultValues })}>Reset</Button>
          <input type="submit" /> */}
        </Grid>
      </form>
    </React.Fragment>
  );
}

AddressForm.propTypes = {
  fulfillmentMethod: PropTypes.string.isRequired,
  fulfillmentDerivatives: PropTypes.object.isRequired,
  postScript: PropTypes.string,
  paymentMethod: PropTypes.string,

  configureFulfillmentMethod: PropTypes.func.isRequired,
  configureFulfillmentDerivatives: PropTypes.func.isRequired,
  configurePostScript: PropTypes.func.isRequired,
  configurePaymentMethod: PropTypes.func,

  currentPage: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  numberOfPage: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fulfillmentMethod: makeSelectFulfillmentMethod(),
  fulfillmentDerivatives: makeSelectFulfillmentDerivatives(),
  postScript: makeSelectPostScript(),
  paymentMethod: makeSelectPaymentMethod(),
});

function mapDispatchToProps(dispatch) {
  return {
    configurePaymentMethod: paymentMethod =>
      dispatch(configurePaymentMethod({ paymentMethod })),
    configureFulfillmentMethod: fulfillmentMethod =>
      dispatch(configureFulfillmentMethod({ fulfillmentMethod })),
    configureFulfillmentDerivatives: ({ ...addressForm }) =>
      dispatch(configureFulfillmentDerivatives({ ...addressForm })),
    configurePostScript: postScript =>
      dispatch(configurePostScript({ postScript })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddressForm);
