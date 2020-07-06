/**
 *
 * CartPageProductRow
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  addProductToCart,
  removeProductFromCart,
  addProductWithVariantToCart,
  removeProductWithVariantFromCart,
} from '../Product/actions';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCartPageProductRow from './selectors';
import reducer from './reducer';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  tableCell: {
    minWidth: '2rem',
  },
}));

export function CartPageProductRow({
  key,
  title,
  variantName,
  qty,
  price,
  addProduct,
  removeProduct,
  addProductWithVariant,
  removeProductWithVariant,
  ccyFormat,
}) {
  useInjectReducer({ key: 'cartPageProductRow', reducer });
  const classes = useStyles();
  const handlePlusChange = () => {
    const product = {
      productName: title,
      productVariant: variantName,
      productQuantity: qty + 1,
      productPrice: price,
    };
    if (variantName === '' || typeof variantName === 'undefined') {
      addProduct(product);
    } else {
      addProductWithVariant(product);
    }
  };
  const handleMinusChange = () => {
    const product = {
      productName: title,
      productVariant: variantName,
      productQuantity: qty - 1,
      productPrice: price,
    };
    if (variantName === '' || typeof variantName === 'undefined') {
      removeProduct(product);
    } else {
      removeProductWithVariant(product);
    }
  };

  return (
    <TableRow key={key}>
      <TableCell>
        <Typography color="primary">
          {title}{variantName && <span>({variantName})</span>}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          // className={classes.gridItem2}
          // aria-label="toggle passwosrd visibility"
          onClick={handlePlusChange}
          // onMouseDown={handleMouseDownPassword}
          // edge="start"
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <Typography color="primary">{qty}</Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          onClick={handleMinusChange}
          // onClick={handleMinusChange(
          //   row.desc,
          //   row.qty,
          //   row.unit,
          // )}
          // disabled={inCartProductQty === 0}
          // className={classes.gridItem2}
          // aria-label="toggle password visibility"
          // onClick={handleMinusChange}
          // onMouseDown={handleMouseDownPassword}
          // edge="end"
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      {/* <TableCell align="right">
        <Typography color="primary">{row.unit}</Typography>
      </TableCell> */}
      <TableCell align="right">
        <Typography color="primary">{ccyFormat(price)}</Typography>
      </TableCell>
    </TableRow>
  );
}

CartPageProductRow.propTypes = {
  title: PropTypes.string.isRequired,
  // qty,
  // price,
  // addProduct,
  // removeProduct,
  // ccyFormat,
};

const mapStateToProps = createStructuredSelector({
  cartPageProductRow: makeSelectCartPageProductRow(),
});

function mapDispatchToProps(dispatch) {
  return {
    addProduct: item => dispatch(addProductToCart(item)),
    removeProduct: item => dispatch(removeProductFromCart(item)),
    addProductWithVariant: item => dispatch(addProductWithVariantToCart(item)),
    removeProductWithVariant: item => dispatch(removeProductWithVariantFromCart(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CartPageProductRow);
