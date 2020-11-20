/**
 *
 * Product
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import VariantItemSectionCard from './VariantItemSectionCard';
import { useCart } from '../../context/Cart';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: theme.comboVariantPopUp.dialog.minWidth,
    // maxHeight: '500px',
    // height: '600px',
  },
}));

export function ComboVariantPopUp({
  name,
  sections,
  price,
  isOpen,
  handleClose,
}) {
  const classes = useStyles();
  const [productToAddToCart, setProductToAddToCart] = useState({
    id: uuidv4(),
    name,
    // eslint-disable-next-line no-useless-escape
    price: Number(price.replace(/[^0-9\.]+/g, '')),
    type: 'COMBO',
    quantity: 1,
    comboVariants: [],
    // eslint-disable-next-line no-useless-escape
    subtotal: Number(price.replace(/[^0-9\.]+/g, '')),
  });
  // console.log('**************Product to add to cart', productToAddToCart);
  const { createCartItem } = useCart();
  const [abidingRules, setAbidingRules] = useState(
    new Array(sections.length).fill(false),
  );
  const observeAbidingRules = (status, ind) => {
    const abidingRulesCloned = [...abidingRules];
    abidingRulesCloned[ind] = status;
    setAbidingRules(abidingRulesCloned);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-combo-variant-dialog-title"
      aria-describedby="combo-variant-dialog-description"
      PaperProps={{ classes: { root: classes.dialog } }}
    >
      <DialogTitle id="combo-variant-dialog-title">
        <FormattedMessage {...messages.variantDialogTitle} />
      </DialogTitle>

      <DialogContent>
        {/* <div style={{ overflow: "hidden", height: "100%", width: "100%" }}> */}
        {sections.map((section, ind) => (
          <VariantItemSectionCard
            key={section.id}
            name={name}
            section={section}
            productToAddToCart={productToAddToCart}
            setProductToAddToCart={setProductToAddToCart}
            modifyAbidingRules={status => observeAbidingRules(status, ind)}
          />
        ))}
        {/* // </div> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage {...messages.variantDialogCancel} />
        </Button>
        <Button
          disabled={!abidingRules.every(el => el === true)}
          onClick={() => {
            // console.log('productToAddToCart', productToAddToCart);
            createCartItem({
              id: productToAddToCart.id,
              name,
              // eslint-disable-next-line no-useless-escape
              price: Number(price.replace(/[^0-9\.]+/g, '')),
              type: 'COMBO',
              quantity: 1,
              variant: productToAddToCart.comboVariants,
            });
            // reset product to add to cart
            setProductToAddToCart({
              id: uuidv4(),
              name,
              // eslint-disable-next-line no-useless-escape
              price: Number(price.replace(/[^0-9\.]+/g, '')),
              type: 'COMBO',
              quantity: 1,
              comboVariants: [],
              // eslint-disable-next-line no-useless-escape
              subtotal: Number(price.replace(/[^0-9\.]+/g, '')),
            });
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

ComboVariantPopUp.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  sections: PropTypes.array,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ComboVariantPopUp;
