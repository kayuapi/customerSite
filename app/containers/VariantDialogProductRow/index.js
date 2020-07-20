/**
 *
 * VariantDialogProductRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectReducer } from 'utils/injectReducer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import makeSelectVariantDialogProductRow from './selectors';
// import { addProductToCart, removeProductFromCart } from '../Product/actions';
// import { makeSelectProductVariantQuantity } from '../Product/selectors';
import reducer from './reducer';
import {
  addVariantToProduct,
  removeVariantFromProduct,
} from '../VariantDialog/actions';

// import messages from './messages';
const useStyles = makeStyles(theme => ({
  tableCell: {
    minWidth: '2rem',
  },
}));

export function VariantDialogProductRow({
  name, // needed when submitting variant dialog
  variant,
  qty,
  price,
  addVariant,
  removeVariant,
  ccyFormat,
}) {
  useInjectReducer({ key: 'variantDialogProductRow', reducer });
  const classes = useStyles();
  const handlePlusChange = () => {
    const variantItem = {
      variantName: variant,
      variantQuantity: qty + 1,
      variantPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    };
    addVariant(variantItem);
  };
  const handleMinusChange = () => {
    const variantItem = {
      variantName: variant,
      variantQuantity: qty - 1,
      variantPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    };
    removeVariant(variantItem);
  };

  return (
    <TableRow key={variant}>
      <TableCell>
        <Typography color="primary">{variant}</Typography>
      </TableCell>
      {/* <TableCell align="right">
        <Typography color="primary">{row.unit}</Typography>
      </TableCell> */}
      <TableCell style={{ minWidth: '4rem' }} align="right">
        <Typography color="primary">
          {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}
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
      <TableCell className={classes.tableCell} align="right">
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
    </TableRow>
  );
}

VariantDialogProductRow.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  addVariant: PropTypes.func.isRequired,
  removeVariant: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  variantDialogProductRow: makeSelectVariantDialogProductRow(),
});

function mapDispatchToProps(dispatch) {
  return {
    addVariant: item => dispatch(addVariantToProduct(item)),
    removeVariant: item => dispatch(removeVariantFromProduct(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VariantDialogProductRow);
