/**
 *
 * CartPageProductRow
 *
 */

import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
// import messages from './messages';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  tableCell: {
    minWidth: '2rem',
  },
}));

export function CartPageProductRow({
  title,
  variantName,
  qty,
  price,
  updateCartItem,
  // addProduct,
  // removeProduct,
  // addProductWithVariant,
  // removeProductWithVariant,
  ccyFormat,
}) {
  useInjectReducer({ key: 'cartPageProductRow', reducer });
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <>
          <Typography color="primary">{title}</Typography>
          <Typography color="primary" style={{ fontSize: '0.7rem' }}>
            {variantName && (
              <span>
                <br />
                {variantName.split('\n').map((item, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={key}>
                    {item}
                    <br />
                  </Fragment>
                ))}
              </span>
            )}
          </Typography>
        </>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          // className={classes.gridItem2}
          // aria-label="toggle passwosrd visibility"
          onClick={() => updateCartItem(1)}
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
          onClick={() => updateCartItem(-1)}
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
  variantName: PropTypes.string,
  qty: PropTypes.number,
  price: PropTypes.number,
  updateCartItem: PropTypes.func,
  // qty,
  // price,
  // addProduct,
  // removeProduct,
  ccyFormat: PropTypes.func,
};

// const mapStateToProps = createStructuredSelector({
//   cartPageProductRow: makeSelectCartPageProductRow(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     addProduct: item => dispatch(addProductToCart(item)),
//     removeProduct: item => dispatch(removeProductFromCart(item)),
//     addProductWithVariant: item => dispatch(addProductWithVariantToCart(item)),
//     removeProductWithVariant: item =>
//       dispatch(removeProductWithVariantFromCart(item)),
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default compose(
  // withConnect,
  memo,
)(CartPageProductRow);
