/**
 *
 * PopUpInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

// import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';

import messages from './messages';

export function PopUpInfo({ isOpen, setPopUpOpen }) {
  const closePopUp = () => {
    setPopUpOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={closePopUp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage {...messages.dialogTitle} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage {...messages.dialogContentLine1} /><br />
          <FormattedMessage {...messages.dialogContentLine2} /><br />
          <FormattedMessage {...messages.dialogContentLine3} /><br />
          <FormattedMessage {...messages.dialogContentLine4} /><br />
          <FormattedMessage {...messages.dialogContentLine5} /><br />
          <FormattedMessage {...messages.dialogContentLine6} /><br />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopUp} color="primary">
          <FormattedMessage {...messages.dialogClose} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PopUpInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setPopUpOpen: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(PopUpInfo);