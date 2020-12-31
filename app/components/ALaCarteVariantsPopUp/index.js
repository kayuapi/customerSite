/**
 *
 * ALaCarteVariantsPopUp
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import VariantItemRow from './VariantItemRow';
import { useCart } from '../../context/Cart';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: theme.aLaCarteVariantPopUp.table.minWidth,
  },
}));

export function ALaCarteVariantPopUp({
  categoryStatus,
  name,
  variants,
  isOpen,
  handleClose,
}) {
  const classes = useStyles();
  const [productsToAddToCart, setProductsToAddToCart] = useState([]);
  const { createCartItem } = useCart();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-variant-dialog-title"
      aria-describedby="variant-dialog-description"
    >
      <DialogTitle id="variant-dialog-title">
        <FormattedMessage {...messages.variantDialogTitle} />
      </DialogTitle>

      <DialogContent>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            padding="none"
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage {...messages.variantDialogItemTitle} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.variantDialogItemPrice} />
                </TableCell>

                <TableCell align="center" colSpan={3}>
                  <FormattedMessage {...messages.variantDialogItemQuantity} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variants.map(variant => (
                <VariantItemRow
                  key={variant.id}
                  id={variant.id}
                  name={name}
                  variant={variant}
                  productsToAddToCart={productsToAddToCart}
                  setProductsToAddToCart={setProductsToAddToCart}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage {...messages.variantDialogCancel} />
        </Button>
        <Button
          disabled={categoryStatus === 'DISABLED'}
          onClick={() => {
            // console.log('productsToAddToCart', productsToAddToCart);
            if (productsToAddToCart.length >= 1) {
              productsToAddToCart.forEach(product => {
                if (product.quantity !== 0) {
                  createCartItem({
                    id: product.variant.id,
                    name,
                    // eslint-disable-next-line no-useless-escape
                    price: Number(product.price.replace(/[^0-9\.]+/g, '')),
                    type: 'A_LA_CARTE',
                    quantity: product.quantity,
                    variant: product.variant.name,
                  });
                }
              });
            }
            setProductsToAddToCart([]);
            handleClose();
          }}
          variant="contained"
          color="primary"
          autoFocus
        >
          <FormattedMessage {...messages.variantDialogConfirm} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ALaCarteVariantPopUp.propTypes = {
  categoryStatus: PropTypes.string,
  name: PropTypes.string,
  variants: PropTypes.array,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ALaCarteVariantPopUp;
