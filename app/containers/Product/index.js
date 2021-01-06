/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-escape */
/**
 *
 * Product
 *
 */

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
import DialogContent from '@material-ui/core/DialogContent';

import { useInjectReducer } from 'utils/injectReducer';
import { useCart } from '../../context/Cart';
import reducer from './reducer';
import messages from './messages';
import VariantDialog from '../VariantDialog/Loadable';
import 'jquery-ui/ui/effects/effect-slide';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 345,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    backgroundColor: theme.mixins.productDisplay.main,
    // color: 'white',
  },
  dialog: {
    minWidth: '80%',
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
    // color: 'white',
  },
  content: {
    flex: '1 0 auto',
    display: 'block',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  content2: {
    flex: '1 0 auto',
    display: 'block',
    alignSelf: 'flex-end',
    paddingBottom: '0 !important',
    width: '100%',
  },
  controls: {
    display: 'block',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: 'center',
    marginBottom: theme.spacing(0),
    height: '120px',
    // color: 'white',
  },
  gridItem: {
    display: 'inline-grid',
  },
  gridItem2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 0',
    // color: 'white',
  },
  // inputLabelRoot: {
  //   '&$inputLabelOutlined': {
  //     color: 'white',
  //   },
  //   '&$inputLabelShrink': {
  //     color: 'white',
  //   },
  // },
  // inputLabelOutlined: {},
  // inputLabelShrink: {},
  // inputRoot: {
  //   '&$disabled $notchedOutline': {
  //     borderColor: 'white',
  //   },
  // },
  // disabled: {},
  // notchedOutline: {},
}));

function SimpleDialog(props) {
  const { onClose, open, title, image, description } = props;
  const handleClose = () => {
    onClose();
  };
  const classes = useStyles();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      PaperProps={{ classes: { root: classes.dialog } }}
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      {image && (
        <DialogContent>
          <CardMedia component="img" image={image} title={title} />
          {description && (
            <Typography style={{ whiteSpace: 'pre-wrap' }} variant="subtitle2">
              {description}
            </Typography>
          )}
        </DialogContent>
      )}
      {!image && (
        <DialogContent>
          <FastfoodIcon />
          {description && (
            <Typography style={{ whiteSpace: 'pre-wrap' }} variant="subtitle2">
              {description}
            </Typography>
          )}
        </DialogContent>
      )}
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
  description: PropTypes.string,
};

export function Product({
  item: {
    id,
    name,
    price,
    image,
    type,
    variants,
    comboVariants,
    description,
    status,
  },
  categoryStatus,
}) {
  useInjectReducer({ key: 'product', reducer });
  const classes = useStyles();

  let inCartProductQty = 0;

  const { cartItems } = useCart();
  // console.log('**CartItems', cartItems);

  if (typeof type === 'undefined' || type === 'A_LA_CARTE') {
    if (variants && variants.length !== 0) {
      // eslint-disable-next-line no-shadow
      const variantsIdList = variants.map(({ id }) => id);
      const totalProductQty = variantsIdList.reduce((acc, curr) => {
        const selected = cartItems.filter(el => el.id === curr);
        let qty = 0;
        if (selected.length !== 0 && selected[0].quantity) {
          qty = selected[0].quantity;
        }
        return acc + qty;
      }, 0);
      inCartProductQty = totalProductQty;
    } else {
      const selected = cartItems.filter(el => el.id === id);
      let qty = 0;
      if (selected.length !== 0 && selected[0].quantity) {
        qty = selected[0].quantity;
      }
      inCartProductQty = qty;
    }
  } else if (type === 'COMBO') {
    // for combo, use name to identify the item
    const allSelectedComboItems = cartItems.filter(
      cartItem => cartItem.name === name,
    );
    // console.log('allSelectedComboItems', allSelectedComboItems);
    const totalSelectedComboItemsQty = allSelectedComboItems
      .map(({ quantity }) => quantity)
      .reduce((a, b) => a + b, 0);
    inCartProductQty = totalSelectedComboItemsQty;
    // eslint-disable-next-line no-empty
  } else {
  }

  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);

  const [quantity, setQuantity] = useState(inCartProductQty);

  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const handleImageClickOpen = () => {
    setIsImageOpen(true);
  };
  const handleClose = () => {
    setIsImageOpen(false);
  };
  useEffect(() => {
    setQuantity(inCartProductQty);
  }, [inCartProductQty]);

  const { createCartItem, updateCartItem } = useCart();

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
    image2.style = `z-index: 1111; height: 40px; width: 50px;opacity:0.8; position:fixed; top:${disTop}px;left:${disLeft}px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1)`;
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
  };

  const handlePlusChange = () => {
    // const directTocart =
    //   (type === 'A_LA_CARTE' &&
    //     (typeof variants === 'undefined' || variants.length === 0)) ||
    //   (type === 'COMBO' &&
    //     (typeof comboVariants === 'undefined' || comboVariants.length === 0));

    const hasVariants =
      // the next line is for backwards compatibility
      (typeof type === 'undefined' && variants && variants.length > 0) ||
      (type === 'A_LA_CARTE' && variants && variants.length > 0) ||
      (type === 'COMBO' && comboVariants && comboVariants.length > 0);

    if (hasVariants) {
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
      image2.style = `z-index: 1111; height: 40px; width: 50px;opacity:0.8; position:fixed; top:${disTop}px;left:${disLeft}px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1)`;
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
    }
  };

  return (
    <>
      <Card className={classes.root}>
        {(categoryStatus === 'DISABLED' || status === 'UNAVAILABLE') && (
          <span
            style={{
              background: '#ff0000',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '5px 10px',
              position: 'absolute',
              right: '30px',
              top: '10px',
              zIndex: 1,
            }}
          >
            <FormattedMessage {...messages.unavailable} />
          </span>
        )}
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
                {/* <Typography variant="body2"> */}
                <b>RM {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}</b>
              </Typography>
            </CardContent>
          </>
        ) : (
          <>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={handleImageClickOpen}
            >
              <FastfoodIcon id={id} />
            </CardActionArea>
            <CardContent className={classes.content}>
              <Typography component="div" variant="body1">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* <Typography variant="body2"> */}
                <b>RM {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}</b>
              </Typography>
            </CardContent>
          </>
          // <div style={{ display: 'flex', flex: '1 0 auto' }}>
          //   <CardContent className={classes.content2}>
          //     <FastfoodIcon id={id} />
          //     <Typography component="div" variant="body1">
          //       {name}
          //     </Typography>
          //     <Typography variant="body2" color="textSecondary">
          //       {/* <Typography variant="body2"> */}
          //       <b>RM {Number(price.replace(/[^0-9\.]+/g, '')).toFixed(2)}</b>
          //     </Typography>
          //   </CardContent>
          // </div>
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
                value={quantity}
                // defaultValue={Number(quantity)}
                inputProps={{
                  'data-label': name,
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{ classes: { input: classes.resize } }}
                // InputLabelProps={{
                //   classes: {
                //     root: classes.inputLabelRoot,
                //     outlined: classes.inputLabelOutlined,
                //     shrink: classes.inputLabelShrink,
                //   },
                // }}
                // InputProps={{
                //   classes: {
                //     root: classes.inputRoot,
                //     disabled: classes.disabled,
                //     notchedOutline: classes.notchedOutline,
                //     input: classes.resize,
                //   },
                // }}
                className={classes.textField}
              />
            </Grid>
            {((typeof type === 'undefined' &&
              (typeof variants === 'undefined' || variants.length === 0)) ||
              (type === 'A_LA_CARTE' &&
                (typeof variants === 'undefined' || variants.length === 0)) ||
              (type === 'COMBO' &&
                (typeof comboVariants === 'undefined' ||
                  comboVariants.length === 0))) && (
              <>
                <Grid item xs={6} className={classes.gridItem}>
                  <IconButton
                    disabled={
                      categoryStatus === 'DISABLED' || status === 'UNAVAILABLE'
                    }
                    className={classes.gridItem2}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handlePlusChange();
                      createCartItem({
                        id,
                        name,
                        price: Number(price.replace(/[^0-9\.]+/g, '')),
                        type: 'A_LA_CARTE',
                        quantity: quantity + 1,
                      });
                      setQuantity(prev => prev + 1);
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                  <IconButton
                    disabled={
                      categoryStatus === 'DISABLED' ||
                      status === 'UNAVAILABLE' ||
                      inCartProductQty === 0
                    }
                    className={classes.gridItem2}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleMinusChange();
                      updateCartItem(id, 'quantity', -1);
                      setQuantity(prev => prev - 1);
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </>
            )}

            {((typeof type === 'undefined' &&
              variants &&
              variants.length > 0) ||
              (type === 'A_LA_CARTE' && variants && variants.length > 0) ||
              (type === 'COMBO' &&
                comboVariants &&
                comboVariants.length > 0)) && (
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
        description={description}
      />
      {((typeof type === 'undefined' && variants && variants.length > 0) ||
        (type === 'A_LA_CARTE' && variants && variants.length > 0) ||
        (type === 'COMBO' && comboVariants && comboVariants.length > 0)) && (
        <VariantDialog
          categoryStatus={categoryStatus}
          status={status}
          name={name}
          type={type}
          price={price}
          variants={
            type === 'A_LA_CARTE'
              ? variants
              : type === 'COMBO'
              ? comboVariants
              : typeof type === 'undefined'
              ? variants
              : null
          }
          isOpen={isVariantDialogOpen}
          handleClose={() => setIsVariantDialogOpen(false)}
        />
      )}
    </>
  );
}

Product.propTypes = {
  categoryStatus: PropTypes.string,
  item: PropTypes.object,
  initVariant: PropTypes.func,
};

export default Product;
// export default compose(
//   withConnect,
//   // memo,
// )(Product);
