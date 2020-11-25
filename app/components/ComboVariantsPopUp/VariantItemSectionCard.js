/**
 *
 * Product
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import CheckboxList from './CheckboxList';

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: 275,
    marginBottom: theme.spacing(1),
    // maxWidth: 275,
    // width: '99%',
    // height: '99%',
  },
}));

export function VariantItemSectionCard({
  section: { title, required, minSelectionNumber, maxSelectionNumber, details },
  productToAddToCart,
  setProductToAddToCart,
  modifyAbidingRules,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Typography variant="h6">{title}</Typography>
          {required && <Chip color="primary" size="small" label="Required" />}
          {!required && <Chip color="primary" size="small" label="Optional" />}
        </Grid>
        {minSelectionNumber !== maxSelectionNumber && (
          <>
            <Chip
              color="primary"
              variant="outlined"
              size="small"
              label={`Min:${minSelectionNumber}`}
            />
            <Chip
              color="primary"
              variant="outlined"
              size="small"
              label={`Max:${maxSelectionNumber}`}
            />
          </>
        )}
        {minSelectionNumber === maxSelectionNumber && (
          <Chip
            color="primary"
            variant="outlined"
            size="small"
            label={`Select ${minSelectionNumber} only.`}
          />
        )}
        <CheckboxList
          productToAddToCart={productToAddToCart}
          setProductToAddToCart={setProductToAddToCart}
          items={details}
          minSelectionNumber={minSelectionNumber}
          maxSelectionNumber={maxSelectionNumber}
          required={required}
          modifyAbidingRules={modifyAbidingRules}
        />
      </CardContent>
    </Card>
  );
}

VariantItemSectionCard.propTypes = {
  section: PropTypes.object,
  productToAddToCart: PropTypes.object,
  setProductToAddToCart: PropTypes.func,
  modifyAbidingRules: PropTypes.func,
};

export default VariantItemSectionCard;
