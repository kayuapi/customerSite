/**
 *
 * OrderedProduct
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrderedProduct from './selectors';
import reducer from './reducer';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: 30,
  },
  inline: {
    display: 'inline',
  },
}));

export function OrderedProduct({ item }) {
  useInjectReducer({ key: 'orderedProduct', reducer });
  const classes = useStyles();
  return (
    <div>
      <ListItem key={item.title}>
        {/* <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            variant="square"
            src={item.image}
            // src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
            className={classes.large}
          />
        </ListItemAvatar> */}
        <ListItemText
          primary={
            <>
              <Typography
                component="div"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                {item.menuItem}
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                QTY:{item.quantity} {item.price}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider component="li" />
    </div>
  );
}

OrderedProduct.propTypes = {
//  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderedProduct: makeSelectOrderedProduct(),
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

export default compose(
  withConnect,
  memo,
)(OrderedProduct);
