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
import LocationIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import OperatingHourIcon from '@material-ui/icons/AccessTime';
import InstagramIcon from '@material-ui/icons/Instagram';
import makeSelectShopInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
// import businessLogo from '../../images/icon-512x512.png';
// import messages from './messages';
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
  // paper: {
  //   minHeight: 'fit-content',
  //   marginTop: theme.spacing(3),
  //   marginBottom: theme.spacing(3),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(300 + theme.spacing(3) * 2)]: {
  //     marginTop: theme.spacing(6),
  //     marginBottom: theme.spacing(50),
  //     padding: theme.spacing(3),
  //   },
  // },
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
  const displayPhoneNumber = process.env.SHOP_INFO_BUSINESS_PHONE_NUMBER.replace(
    /([+]\w{1})(\w{3})(\w+)(\w{4})/,
    '$1 $2 $3 $4',
  );
  const whatsappLink = `https://wa.me/${
    process.env.SHOP_INFO_BUSINESS_PHONE_NUMBER
  }`;
  return (
    <div>
      <Helmet>
        <title>ShopInfo</title>
        <meta name="description" content="Description of ShopInfo" />
      </Helmet>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {/* <img src={businessLogo} alt="business logo" /> */}
          <Typography component="h1" variant="h4" align="center">
            {process.env.SHOP_INFO_BUSINESS_NAME}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <br />
            <br />
            <br />
            <LocationIcon />
            &nbsp; 地址: {process.env.SHOP_INFO_BUSINESS_ADDRESS}
            <br />
            <br />
            <OperatingHourIcon />
            &nbsp; 营业时间: {process.env.SHOP_INFO_OPERATING_HOURS}
            <br />
            <br />
            <PhoneIcon />
            &nbsp; 联络电话：{displayPhoneNumber}
            &nbsp;
            <a href={whatsappLink}>
              <WhatsAppIcon />
            </a>
            <br />
            <br />
            <FacebookIcon />
            &nbsp; Facebook：
            <a
              href={process.env.SHOP_INFO_BUSINESS_FACEBOOK_LINK}
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              {process.env.SHOP_INFO_BUSINESS_FACEBOOK}
            </a>
            <br />
            <br />
            <InstagramIcon />
            &nbsp; Instagram：
            <a
              href={process.env.SHOP_INFO_BUSINESS_INSTAGRAM_LINK}
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              {process.env.SHOP_INFO_BUSINESS_INSTAGRAM}
            </a>
            <br />
          </Typography>
          <br />
          <br />
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.849011725798!2d102.5985398247281!3d2.0451488801042244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1b9bcd9c0df01%3A0x913d532452fe9c88!2zZ3VvYmHplIXniLgg5Y-w5rm-54Gr6ZSF77yI6bq75Z2h5bqX77yJ!5e0!3m2!1sen!2smy!4v1594723819342!5m2!1sen!2smy"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
          />
          {/* <MyMapComponent
            center={[
              Number(process.env.SHOP_INFO_LATITUDE),
              Number(process.env.SHOP_INFO_LONGITUDE),
            ]}
            zoom={18}
          /> */}
        </Paper>
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
