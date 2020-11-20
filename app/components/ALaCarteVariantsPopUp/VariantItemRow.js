/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

export default function VariantItemRow({
  id,
  name,
  variant,
  productsToAddToCart,
  setProductsToAddToCart,
}) {
  const [quantity, setQuantity] = useState(0);

  const handleUpdate = qty => {
    const isPresent = productsToAddToCart.findIndex(
      el => el.variant.id === variant.id,
    );
    const newProductsToAddToCart = [...productsToAddToCart];
    if (isPresent !== -1) {
      newProductsToAddToCart[isPresent].quantity = qty;
      setProductsToAddToCart(newProductsToAddToCart);
    } else {
      newProductsToAddToCart.push({
        id,
        name,
        price: Number(variant.price.replace(/[^0-9\.]+/g, '')).toFixed(2),
        type: 'A_LA_CARTE',
        quantity: qty,
        variant: {
          id: variant.id,
          name: variant.name,
          price: variant.price,
        },
      });
      setProductsToAddToCart(newProductsToAddToCart);
    }
  };
  return (
    <TableRow key={variant.id}>
      <TableCell>
        <Typography color="primary">{variant.name}</Typography>
      </TableCell>
      <TableCell style={{ width: '8ch' }} align="right">
        <Typography color="primary">
          {Number(variant.price.replace(/[^0-9\.]+/g, '')).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="medium"
          aria-label="add variant"
          onClick={() => {
            setQuantity(prev => prev + 1);
            handleUpdate(quantity + 1);
          }}
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
          onClick={() => {
            setQuantity(prev => prev - 1);
            handleUpdate(quantity - 1);
          }}
          disabled={quantity === 0}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
VariantItemRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  variant: PropTypes.object.isRequired,
  productsToAddToCart: PropTypes.array,
  setProductsToAddToCart: PropTypes.func,
};
