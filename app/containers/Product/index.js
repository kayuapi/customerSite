/**
 *
 * Product
 *
 */

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import CardActionArea from '@material-ui/core/CardActionArea';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import { addProductToCart, removeProductFromCart } from './actions';
import messages from './messages';
import VariantDialog from '../VariantDialog/Loadable';
import { initVariantOfProduct } from '../VariantDialog/actions';
import 'jquery-ui/ui/effects/effect-slide';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 345,
    marginRight: '1rem',
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    backgroundColor: theme.mixins.productDisplay.main,
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    // width: 'auto',
    // height: 'auto',
    'object-fit': 'contain',
  },
  cardActionArea: {
    height: '100%',
    minHeight: '1px',
    textAlign: 'center',
  },
  textField: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  resize: {
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    paddingBottom: theme.spacing(3),
    flexDirection: 'column',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(5),
    justifyContent: 'center',
  },
  gridItem: {
    display: 'inline-grid',
  },
  gridItem2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 0',
  },
  icon: {
    marginTop: '76px',
  },
}));

function SimpleDialog(props) {
  const { onClose, open, title, image } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <CardMedia component="img" image={image} title={title} />
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
};

export function Product({
  initVariant,
  addProduct,
  removeProduct,
  id,
  item: { name, price, image, variants },
}) {
  const getInCartProductQty = inCartProducts => {
    if (!Array.isArray(inCartProducts) || !inCartProducts.length) {
      return 0;
    }
    // const k = inCartProducts.map(({ name }) => name).indexOf(name);
    // if (k !== -1) {
    //   return inCartProducts[k].quantity;
    // }
    // return 0;

    const totalAmount = inCartProducts.reduce((acc, v, i) => {
      if (v.name === name) {
        // eslint-disable-next-line no-param-reassign
        acc += v.quantity;
      }
      return acc;
    }, 0);
    return totalAmount;
  };

  useInjectReducer({ key: 'product', reducer });
  const classes = useStyles();
  const inCartProducts = useSelector(state => state.product);
  const inCartProductQty = getInCartProductQty(inCartProducts);

  const [value, setValue] = useState(inCartProductQty);
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);

  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const handleImageClickOpen = () => {
    setIsImageOpen(true);
  };
  const handleClose = () => {
    setIsImageOpen(false);
  };
  useEffect(() => {
    setValue(inCartProductQty);
  }, [inCartProductQty]);

  const handleMinusChange = () => {
    // animation
    const imgtodrag = document.getElementById(id);
    const viewcart = document.getElementById('testing');
    //    let imgtodragImage = imgtodrag.querySelector('.pro-image-front');
    const imgtodragImage = imgtodrag;
    const disLeft = viewcart.getBoundingClientRect().left;
    const disTop = viewcart.getBoundingClientRect().top;
    const cartleft = imgtodrag.getBoundingClientRect().left;
    const carttop = imgtodrag.getBoundingClientRect().top;
    const image2 = imgtodragImage.cloneNode(true);
    image2.style = `z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:${disTop}px;left:${disLeft}px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1)`;
    const rechange = document.body.appendChild(image2);
    setTimeout(() => {
      image2.style.left = `${cartleft}px`;
      image2.style.top = `${carttop}px`;
      image2.style.width = '40px';
      image2.style.opacity = '0';
    }, 200);
    setTimeout(() => {
      rechange.parentNode.removeChild(rechange);
    }, 2000);
    const product = {
      productName: name,
      productQuantity: inCartProductQty - 1,
      productPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
    };
    setValue(product.productQuantity);
    removeProduct(product);
  };

  const handlePlusChange = () => {
    if (variants) {
      initVariant(name, variants, inCartProducts);
      setIsVariantDialogOpen(true);
    } else {
      // animation
      const imgtodrag = document.getElementById(id);
      const viewcart = document.getElementById('testing');
      //    let imgtodragImage = imgtodrag.querySelector('.pro-image-front');
      const imgtodragImage = imgtodrag;
      const disLeft = imgtodrag.getBoundingClientRect().left;
      const disTop = imgtodrag.getBoundingClientRect().top;
      const cartleft = viewcart.getBoundingClientRect().left;
      const carttop = viewcart.getBoundingClientRect().top;
      const image2 = imgtodragImage.cloneNode(true);
      image2.style = `z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:${disTop}px;left:${disLeft}px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1)`;
      const rechange = document.body.appendChild(image2);
      setTimeout(() => {
        image2.style.left = `${cartleft}px`;
        image2.style.top = `${carttop}px`;
        image2.style.width = '40px';
        image2.style.opacity = '0';
      }, 100);
      setTimeout(() => {
        rechange.parentNode.removeChild(rechange);
      }, 1000);
      const product = {
        productName: name,
        productQuantity: inCartProductQty + 1,
        productPrice: Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2),
      };
      setValue(product.productQuantity);
      addProduct(product);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        {image ? (
          <>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={handleImageClickOpen}
            >
              <CardMedia
                component="img"
                alt={name}
                id={id}
                height="100%"
                // width="100"
                className={classes.cardMedia}
                image={image}
                title={name}
              />
            </CardActionArea>
            <CardContent className={classes.content}>
              <Typography component="div" variant="body1">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <b>RM {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}</b>
              </Typography>
            </CardContent>
          </>
        ): (
          <>
            <CardContent className={classes.content}>
              <FastfoodIcon className={classes.icon} id={id} />
              <Typography component="div" variant="body1">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <b>RM {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}</b>
              </Typography>
            </CardContent>
          </>
        )}
        <CardActions className={classes.controls}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                disabled
                label={<FormattedMessage {...messages.orderQuantity} />}
                variant="outlined"
                placeholder="0"
                autoComplete="off"
                fullWidth
                type="number"
                value={value}
                // defaultValue={Number(quantity)}
                inputProps={{
                  'data-label': name,
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                }}
                InputProps={{classes: { input: classes.resize }}}
                className={classes.textField}
              />
            </Grid>
            {!variants && (
              <>
                <Grid item xs={6} className={classes.gridItem}>
                  <IconButton
                    className={classes.gridItem2}
                    aria-label="toggle password visibility"
                    onClick={handlePlusChange}
                    // onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                  <IconButton
                    disabled={inCartProductQty === 0}
                    className={classes.gridItem2}
                    aria-label="toggle password visibility"
                    onClick={handleMinusChange}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </>
            )}
            {variants && (
              <>
                <Grid item xs={12} className={classes.gridItem}>
                  <IconButton
                    className={classes.gridItem2}
                    aria-label="toggle password visibility"
                    onClick={handlePlusChange}
                    // onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    <FormattedMessage {...messages.choose} />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        </CardActions>
      </Card>

      <SimpleDialog
        open={isImageOpen}
        onClose={handleClose}
        title={name}
        image={image}
      />
      {variants &&
        <VariantDialog
          name={name}
          variants={variants}
          isOpen={isVariantDialogOpen}
          handleClose={() => setIsVariantDialogOpen(false)}
        />
      }
    </>
  );
}

Product.propTypes = {
  item: PropTypes.object,
  initVariant: PropTypes.func,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  id: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    initVariant: (productName, variantList, inCartProducts) =>
      dispatch(initVariantOfProduct(productName, variantList, inCartProducts)),
    addProduct: item => dispatch(addProductToCart(item)),
    removeProduct: item => dispatch(removeProductFromCart(item)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  // memo,
)(Product);
