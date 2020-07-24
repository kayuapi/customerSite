/**
 *
 * VariantDialogProductRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import makeSelectVariantDialogProductRow from './selectors';
import reducer from './reducer';
import {
  addVariantToProduct,
  removeVariantFromProduct,
} from '../VariantDialog/actions';

export function VariantDialogProductRow({
  variant: { id, name, quantity, price },
  addVariant,
  removeVariant,
}) {
  useInjectReducer({ key: 'variantDialogProductRow', reducer });
  const handlePlusChange = () => {
    const variantItem = {
      variantName: name,
      variantQuantity: Number(quantity) + 1,
      variantPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    };
    addVariant(variantItem);
  };
  const handleMinusChange = () => {
    const variantItem = {
      variantName: name,
      variantQuantity: Number(quantity) - 1,
      variantPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    };
    removeVariant(variantItem);
  };

  return (
    <TableRow key={id}>
      <TableCell>
        <Typography color="primary">{name}</Typography>
      </TableCell>
      <TableCell style={{ minWidth: '8ch' }} align="right">
        <Typography color="primary">
          {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          aria-label="add variant"
          onClick={handlePlusChange}
          disabled={quantity === 999}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      <TableCell style={{ minWidth: '4ch' }} align="right">
        <Typography color="primary">{quantity}</Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          aria-label="minus variant"
          onClick={handleMinusChange}
          disabled={quantity === 0}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

VariantDialogProductRow.propTypes = {
  variant: PropTypes.object.isRequired,
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
