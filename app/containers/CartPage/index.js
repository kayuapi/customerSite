/**
 *
 * CartPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { useInjectReducer } from 'utils/injectReducer';
import CartPageProductRow from '../CartPageProductRow';
import { makeSelectIsOpen } from './selectors';
import { closeCart } from './actions';
import { useCart } from '../../context/Cart';

import reducer from './reducer';
import messages from './messages';

const TAX_RATE = 0.0;

const useStyles = makeStyles({
  dialogActions: {
    marginBottom: 64,
  },
  table: {
    minWidth: 300,
  },
  tablecell: {
    // fontSize: '8pt',
    minWidth: '4rem',
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotalFunc(items) {
  // console.log('**items', items);
  if (!Array.isArray(items) || !items.length) {
    return 0;
  }
  const pr = items
    .map(({ subtotal }) => subtotal)
    .reduce((sum, i) => sum + i, 0);
  return pr;
}

// eslint-disable-next-line no-shadow
export function CartPage({ isOpen, closeCart }) {
  const history = useHistory();
  const classes = useStyles();
  const { cartItems, updateCartItem } = useCart();
  useInjectReducer({ key: 'cartPage', reducer });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSubmitCart = () => {
    history.push('/details');
    closeCart();
  };
  const handleClose = () => {
    closeCart();
  };

  const [invoice, setInvoice] = useState({ subtotal: 0, taxes: 0, total: 0 });

  useEffect(() => {
    // console.log('cartItems CHANGE');
    setInvoice({
      subtotal: subtotalFunc(cartItems),
      taxes: TAX_RATE * subtotalFunc(cartItems),
      total: subtotalFunc(cartItems) + TAX_RATE * subtotalFunc(cartItems),
    });
  }, [cartItems]);

  return (
    <div>
      <Helmet>
        <title>CartPage</title>
        <meta name="description" content="Description of CartPage" />
      </Helmet>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> */}

          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              padding="none"
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <FormattedMessage {...messages.dialogDetails} />
                  </TableCell>
                  <TableCell className={classes.tablecell} align="right">
                    <FormattedMessage {...messages.dialogPrice} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormattedMessage {...messages.dialogItemTitle} />
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    <FormattedMessage {...messages.dialogItemQuantity} />
                  </TableCell>
                  {/* <TableCell align="right">
                    <FormattedMessage {...messages.dialogItemUnit} />
                  </TableCell> */}
                  <TableCell align="right">
                    <FormattedMessage {...messages.dialogItemSum} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map(item => {
                    let variantName = '';
                    // console.log('item', item);
                    if (item.variant) {
                      variantName = JSON.stringify(item.variant)
                        .replace(/["']/g, '')
                        .replace(/[,]/g, '\n');
                    }
                    return (
                      <CartPageProductRow
                        key={item.id}
                        title={item.name}
                        variantName={variantName}
                        qty={item.quantity}
                        price={item.subtotal}
                        ccyFormat={ccyFormat}
                        updateCartItem={attributeValue =>
                          updateCartItem(item.id, 'quantity', attributeValue)
                        }
                      />
                    );
                  })}
                <TableRow>
                  <TableCell rowSpan={3} />
                </TableRow>

                {/* <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>
                    <FormattedMessage {...messages.dialogItemSubtotal} />
                  </TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoice.subtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormattedMessage {...messages.dialogItemTax} />
                  </TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0,
                  )} %`}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoice.taxes)}
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell align="right" colSpan={3}>
                    <FormattedMessage {...messages.dialogItemTotal} />
                  </TableCell>
                  <TableCell align="right">
                    RM {ccyFormat(invoice.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage {...messages.dialogCancel} />
          </Button>
          <Button
            onClick={handleSubmitCart}
            variant="contained"
            color="primary"
            autoFocus
          >
            <FormattedMessage {...messages.dialogOrder} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CartPage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeCart: () => dispatch(closeCart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CartPage);
export { ccyFormat, subtotalFunc };
