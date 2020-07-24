/**
 *
 * VariantDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectReducer } from 'utils/injectReducer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import reducer from './reducer';
import messages from './messages';
import {
  selectVariantDialogDomain,
  makeSelectVariantDialog,
} from './selectors';
import { setVariantsInProductCart } from '../Product/actions';

import VariantDialogProductRow from '../VariantDialogProductRow';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300,
  },
}));

export function VariantDialog({
  name,
  isOpen,
  handleClose,
  variantItems,
  submitVariant,
}) {
  useInjectReducer({ key: 'variantDialog', reducer });
  const classes = useStyles();
  const handleSubmitVariant = (productName, items) => {
    const itemsToSubmit = items.map(el => ({
      ...el,
      price: Number(el.price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    }));
    submitVariant(productName, itemsToSubmit);
    handleClose();
  };
  return (
    <Dialog
      // fullScreen={fullScreen}
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
              {variantItems.map(variant => (
                <VariantDialogProductRow key={variant.id} variant={variant} />
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
          onClick={() => handleSubmitVariant(name, variantItems)}
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

VariantDialog.propTypes = {
  name: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
  variantItems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  variantDialog: makeSelectVariantDialog(),
  variantItems: selectVariantDialogDomain,
});

function mapDispatchToProps(dispatch) {
  return {
    submitVariant: (productName, items) =>
      dispatch(setVariantsInProductCart(productName, items)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VariantDialog);
