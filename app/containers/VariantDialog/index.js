/**
 *
 * VariantDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';

import ALaCarteVariantsPopUp from '../../components/ALaCarteVariantsPopUp';
import ComboVariantSPopUp from '../../components/ComboVariantsPopUp';

// import { makeSelectVariantDialog } from './selectors';
// import { setVariantsInProductCart } from '../Product/actions';

export function VariantDialog({
  name,
  type: productType,
  price,
  variants,
  isOpen,
  handleClose,
}) {
  useInjectReducer({ key: 'variantDialog', reducer });
  return (
    <>
      {(typeof productType === 'undefined' || productType === 'A_LA_CARTE') && (
        <ALaCarteVariantsPopUp
          name={name}
          variants={variants}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}
      {productType === 'COMBO' && (
        <ComboVariantSPopUp
          name={name}
          price={price}
          sections={variants}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

VariantDialog.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  price: PropTypes.string,
  variants: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   variantDialog: makeSelectVariantDialog(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     submitVariant: (productName, items) =>
//       dispatch(setVariantsInProductCart(productName, items)),
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(VariantDialog);
export default VariantDialog;
