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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CartPageProductRow from '../CartPageProductRow';
import { makeSelectIsOpen } from './selectors';
import { makeSelectProduct } from '../Product/selectors';
import { openCart, closeCart } from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const TAX_RATE = 0.00;

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

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, productName, variantName, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, productName, variantName, qty, unit, price };
}

function subtotal(items) {
  if (!Array.isArray(items) || !items.length) {
    return 0;
  }
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// createRowsForOrders accept array
function createRowsForOrders(data) {
  const rows = data.reduce((a, e, i) => {
    if (Number(e.quantity) !== 0) {
      if (e.variant) {
        a.push(
          createRow(
            `${e.name}(${e.variant})`,
            e.name,
            e.variant,
            e.quantity,
            Number(e.price),
          ),
        );
      } else {
        a.push(
          createRow(
            `${e.name}`,
            e.name,
            e.variant,
            e.quantity,
            Number(e.price),
          ),
        );
      }
    }
    return a;
  }, []);
  return rows;
}

export function CartPage({ isOpen, openCart, closeCart, cartItems }) {
  let history = useHistory();
  const classes = useStyles();
  useInjectReducer({ key: 'cartPage', reducer });
  useInjectSaga({ key: 'cartPage', saga });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSubmitCart = () => {
    history.push("/details");
    closeCart();
  };
  const handleClose = () => {
    closeCart();
  };
  const [rows, setRows] = useState([{ orders: [], uncommittedOrders: [] }]);
  const [invoice, setInvoice] = useState({ subtotal: 0, taxes: 0, total: 0 });

  useEffect(() => {
    const rows3 = createRowsForOrders(cartItems);
    setRows(prevRows => ({ ...prevRows, orders: rows3 }));
  }, [cartItems]);

  useEffect(() => {
    setInvoice({
      subtotal: subtotal(rows.orders),
      taxes: TAX_RATE * subtotal(rows.orders),
      total: subtotal(rows.orders) + TAX_RATE * subtotal(rows.orders),
    });
  }, [rows]);

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
                {rows.orders &&
                  rows.orders.map(row => (
                    <CartPageProductRow
                      key={row.desc}
                      title={row.productName}
                      variantName={row.variantName}
                      qty={row.qty}
                      price={row.price}
                      ccyFormat={ccyFormat}
                    />
                  ))}
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
  openCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  cartItems: makeSelectProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CartPage);
export { ccyFormat, priceRow, createRow, subtotal, createRowsForOrders };
