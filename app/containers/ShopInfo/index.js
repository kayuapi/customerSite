/**
 *
 * ShopInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import makeSelectShopInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
// import businessLogo from '../../images/icon-512x512.png';
import messages from './messages';
import { MyMapComponent } from '../../components/MyMapComponent';
import 'leaflet/dist/leaflet.css';
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

export function ShopInfo() {
  useInjectReducer({ key: 'shopInfo', reducer });
  useInjectSaga({ key: 'shopInfo', saga });
  const classes = useStyles();
  const phoneNumber = '0123531370';
  const whatsappLink = `https://wa.me/6${phoneNumber}`;
  return (
    <div>
      <Helmet>
        <title>ShopInfo</title>
        <meta name="description" content="Description of ShopInfo" />
      </Helmet>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Container maxWidth="md" style={{ height: '500px' }}>
          <Paper className={classes.paper}>
            {/* <img src={businessLogo} alt="business logo" /> */}
            <Typography component="h1" variant="h4" align="center">
              {process.env.SHOP_INFO_BUSINESS_NAME}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <br />
              <br />
              <br />
              地址: {process.env.SHOP_INFO_BUSINESS_ADDRESS}
              <br />
              联络电话：{process.env.SHOP_INFO_BUSINESS_PHONE_NUMBER} &nbsp;
              <a href={whatsappLink}>
                <WhatsAppIcon />
              </a>
              <br />
            </Typography>
            <MyMapComponent
              center={[
                Number(process.env.SHOP_INFO_LATITUDE),
                Number(process.env.SHOP_INFO_LONGITUDE),
              ]}
              zoom={18}
            />
          </Paper>
        </Container>
      </main>
    </div>
  );
}

ShopInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shopInfo: makeSelectShopInfo(),
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

export default compose(withConnect)(ShopInfo);
