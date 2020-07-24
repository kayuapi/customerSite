/**
 *
 * MyAppBar
 *
 */

import React, { memo, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import API from '@aws-amplify/api';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  logo: {
    width: '100%',
    height: theme.mixins.banner.height,
    top: 0,
    left: 0,
    position: 'absolute',
  },
}));

async function grabFromDb(hostName, item) {
  // await Auth.currentCredentials;
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {},
      response: false,
    };
    const path = `${basePath}/${hostName}/${item}`;
    const retrievedItem = await API.get(apiName, path, myInit);
    return retrievedItem;
  } catch (err) {
    return { err };
  }
}

function MyAppBar() {
  const classes = useStyles();
  const [banner, setBanner] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageDisplayType, setImageDisplayType] = useState('contain');
  const hostName = process.env.BUSINESS_NAME;
  useEffect(() => {
    grabFromDb(hostName, 'Banner').then(bannerInfo => {
      setBanner(bannerInfo.banner);
      setImageDisplayType(bannerInfo.bannerDisplayType);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <img
          src={banner}
          alt={banner}
          className={classes.logo}
          style={{ objectFit: imageDisplayType }}
        />
      )}
    </div>
  );
}

export default memo(MyAppBar);
