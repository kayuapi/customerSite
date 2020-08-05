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

export function PopUpInfo({
  isOpen,
  setPopUpOpen,
  updateMessageFromVendor,
  runtime,
}) {
  const closePopUp = () => {
    setPopUpOpen(false);
  };
  const updateWebsite = () => {
    runtime.applyUpdate();
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
      {updateMessageFromVendor && (
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage {...messages.updateMessageFromVendor} />
              <br />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={updateWebsite} color="primary">
              <FormattedMessage {...messages.dialogClose} />
            </Button>
          </DialogActions>
        </>
      )}
      {!updateMessageFromVendor && (
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage {...messages.dialogContentLine1} /><br /><br />
              <FormattedMessage {...messages.dialogContentLine2} />
              <span role="img" aria-label="thanks">
                🙏
              </span>
              <br />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closePopUp} color="primary">
              <FormattedMessage {...messages.dialogClose} />
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

PopUpInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setPopUpOpen: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateMessageFromVendor: PropTypes.bool,
  runtime: PropTypes.object,
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
