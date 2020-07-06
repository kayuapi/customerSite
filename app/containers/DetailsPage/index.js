/**
 *
 * DetailsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { configureBusinessName } from './actions';
import { FULFILLMENT_METHODS } from './schema';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {
  makeSelectOrderNumber,
  makeSelectFulfillmentMethod,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: '150px',
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
const steps = [
  <FormattedMessage {...messages.shippingAddress} />,
  <FormattedMessage {...messages.paymentMethods} />,
  <FormattedMessage {...messages.orderReview} />,
];

export function DetailsPage({
  orderNumber,
  fulfillmentMethod,
  // eslint-disable-next-line no-shadow
  configureBusinessName,
}) {
  const classes = useStyles();
  console.log('orderNumber', orderNumber);
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(() => {
    configureBusinessName({ businessName: process.env.BUSINESS_NAME });
  }, []);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            currentPage={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            numberOfPage={3}
          />
        );
      case 1:
        return (
          <PaymentForm
            currentPage={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            numberOfPage={3}
          />
        );
      case 2:
        return (
          <Review
            currentPage={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            numberOfPage={3}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }
  useInjectReducer({ key: 'detailsPage', reducer });
  useInjectSaga({ key: 'detailsPage', saga });

  return (
    <div>
      <Helmet>
        <title>DetailsPage</title>
        <meta name="description" content="Description of DetailsPage" />
      </Helmet>
      <div className={classes.toolbar} />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            <FormattedMessage {...messages.checkout} />
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label.props.id}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  <FormattedMessage {...messages.thankYou} />
                </Typography>
                <Typography variant="subtitle1">
                  {fulfillmentMethod === FULFILLMENT_METHODS.DINE_IN && (
                    <FormattedMessage
                      {...messages.receivedOrderForOnPremise}
                      values={{ linebreak: <br />, orderNumber }}
                    />
                  )}
                  {fulfillmentMethod === FULFILLMENT_METHODS.DELIVERY && (
                    <FormattedMessage
                      {...messages.receivedOrderForDelivery}
                      values={{ linebreak: <br />, orderNumber }}
                    />
                  )}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {/* <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div> */}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </div>
  );
}

DetailsPage.propTypes = {
  // orderNumber: PropTypes.string.isRequired,
  fulfillmentMethod: PropTypes.string.isRequired,
  configureBusinessName: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  orderNumber: makeSelectOrderNumber(),
  fulfillmentMethod: makeSelectFulfillmentMethod(),
});

function mapDispatchToProps(dispatch) {
  return {
    configureBusinessName: businessName =>
      dispatch(configureBusinessName(businessName)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsPage);
