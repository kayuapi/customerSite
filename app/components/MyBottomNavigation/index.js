/**
 *
 * MyBottomNavigation
 *
 */

 //TODO 10/03/2020: this is no longer a presentational component

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/MenuBook';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DetailsIcon from '@material-ui/icons/Face';
import messages from './messages';

const useStyles = makeStyles(theme =>
  createStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: theme.mixins.bottomNav.background,
    },
    actionClasses: {
      color: theme.mixins.bottomNav.unselected,
      '&$selected': {
        color: theme.palette.primary.main,
      },
    },
    selected: {},
  }),
);
const paths = ['/menu', '/details', '/shopInfos'];

function MyBottomNavigation({ pathname }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const pathIndex = paths.indexOf(pathname);
  if (pathIndex !== -1 && pathIndex !== value) {
    setValue(pathIndex);
  }

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label={<FormattedMessage {...messages.menu} />}
          icon={<MenuIcon />}
          component={Link}
          classes={{ root: classes.actionClasses }}
          to="/menu"
        />
        <BottomNavigationAction
          label={<FormattedMessage {...messages.details} />}
          icon={<DetailsIcon />}
          component={Link}
          classes={{ root: classes.actionClasses }}
          to="/details"
        />
        <BottomNavigationAction
          label={<FormattedMessage {...messages.shopInfo} />}
          icon={<StorefrontIcon />}
          component={Link}
          classes={{ root: classes.actionClasses }}
          to="/shopInfo"
        />
      </BottomNavigation>
    </>
  );
}

MyBottomNavigation.propTypes = { pathname: PropTypes.string };

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyBottomNavigation);
