/**
 *
 * ProductWithVariants
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';

import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import CardActionArea from '@material-ui/core/CardActionArea';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import DialogActions from '@material-ui/core/DialogActions';

import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectProduct from './selectors';
import reducer from './reducer';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    //height: '100%',
    display: 'flex',
    'flex-basis': 'auto',
//    flex: '1 0 auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    // width: 'auto',
    // height: 'auto',
    'object-fit': 'contain',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'center',
  },
  textFieldMarginRight: {
    width: '30%',
    'align-content': 'flex-end',
    marginRight: -12,
  },
  textField: {
    width: '100%',
    backgroundColor: '#fff8e1',
  },
  listitemcontainer: {
    display: 'flex',
  },
  resize: {
    fontSize: 16,
    textAlign: 'center',
  },
  cover: {
    width: '100%',
    height: 'auto',
  },
  orderField: {
    width: 200,
//    flex: '1 0 content',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatarContainer: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root2: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    backgroundColor: '#ffe082',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
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

export function ProductWithVariants({ items }) {
  useInjectReducer({ key: 'productWithVariants', reducer });
  // extract common properties such as title and image
  const [{ title, image }] = items;

  const classes = useStyles();
  const [data, setData] = useState({
    [items[0].variant]: {
      qty: '',
      syncing: false,
    },
    [items[1].variant]: {
      qty: '',
      syncing: false,
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const firestore = useFirestore();

  const businessId = useSelector(state => state.chmtoken.businessName);
  const chmtokenId = useSelector(state => state.chmtoken.uid);

  const uncommittedOrders = useSelector(
    state => state.firestore.data.UncommittedOrdersCollection,
  );

  const uncommittedOrdersCollectionDocPath0 = {
    collection: 'businesses',
    // doc: 'nFcYKyZFJ6zx12bOeup6',
    doc: businessId,
    subcollections: [
      {
        collection: 'chmtokens',
        // doc: 'Gwh02CHijb8sYcBe8STk',
        doc: chmtokenId,
        subcollections: [
          {
            collection: 'uncommittedOrders',
            doc: `${title}-${items[0].variant}`,
          },
        ],
      },
    ],
    // storeAs: 'UncommittedOrdersCollectionDoc0',
  };

  const uncommittedOrdersCollectionDocPath1 = {
    collection: 'businesses',
    // doc: 'nFcYKyZFJ6zx12bOeup6',
    doc: businessId,
    subcollections: [
      {
        collection: 'chmtokens',
        // doc: 'Gwh02CHijb8sYcBe8STk',
        doc: chmtokenId,
        subcollections: [
          {
            collection: 'uncommittedOrders',
            doc: `${title}-${items[1].variant}`,
          },
        ],
      },
    ],
    // storeAs: 'UncommittedOrdersCollectionDoc1',
  };

  useEffect(() => {
    // console.log('in use effect');
    const { qty, syncing } = data[items[0].variant];
    if (syncing) {
      // console.log('syncing');
      setData(prevData => ({
        ...prevData,
        [items[0].variant]: {
          qty,
          syncing: false,
        },
      }));
    } else {
      // console.log('not syncing');
      setData(prevData => ({
        ...prevData,
        [items[0].variant]: {
          qty:
            typeof items[0].quantity === 'undefined' ? '' : items[0].quantity,
          syncing: false,
        },
      }));
    }
  }, [items[0].quantity]);

  useEffect(() => {
    // console.log('in use effect');
    const { qty, syncing } = data[items[1].variant];
    if (syncing) {
      // console.log('syncing');
      setData(prevData => ({
        ...prevData,
        [items[1].variant]: {
          qty,
          syncing: false,
        },
      }));
    } else {
      // console.log('not syncing');
      setData(prevData => ({
        ...prevData,
        [items[1].variant]: {
          qty:
            typeof items[1].quantity === 'undefined' ? '' : items[1].quantity,
          syncing: false,
        },
      }));
    }
  }, [items[1].quantity]);

  const handleChange = evt => {
    const inputValue = parseInt(evt.target.value, 10);
    const variant = evt.target.getAttribute('data-variant');
    const toSubmit = {
      title: evt.target.getAttribute('data-title'),
      variant,
      quantity: isNaN(inputValue) ? '' : inputValue,
      unitPrice: Number(evt.target.getAttribute('data-price')),
      chmtokenId,
    };
    if (variant === items[0].variant) {
      firestore.set(uncommittedOrdersCollectionDocPath0, toSubmit);
      setData(prevData => ({
        ...prevData,
        [items[0].variant]: {
          qty: isNaN(inputValue) ? '' : inputValue,
          syncing: true,
        },
      }));
    } else if (variant === items[1].variant) {
      firestore.set(uncommittedOrdersCollectionDocPath1, toSubmit);
      setData(prevData => ({
        ...prevData,
        [items[1].variant]: {
          qty: isNaN(inputValue) ? '' : inputValue,
          syncing: true,
        },
      }));
    } else;
  };

  return (
    <>
      <Grid item key={title} xs={6} sm={6} md={4}>
        <Card className={classes.root2}>
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia
              component="img"
              alt={title}
              height="100"
              width="100"
              // style={{width: '100%', objectFit: 'cover'}}
              className={classes.cardMedia}
              // objectFit="fill"
              // maxHeight="100"
              // width="100%"
              image={image}
              // image="https://upload.wikimedia.org/wikipedia/commons/c/c3/Phelsuma_l._laticauda.jpg"
              title={title}
            />
          </CardActionArea>
          <CardContent className={classes.content}>
            <Typography component="div" variant="body1">
              {title}
            </Typography>
          </CardContent>
          <CardActions className={classes.controls}>
            <Grid container spacing={2}>
              {items.map(({ title, price, quantity, variant }) => (
                <Grid item key={variant} xs={6} sm={6} md={6}>
                  <Typography component="div" variant="body2">
                    {variant}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    RM {Number(price).toFixed(2)}
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label={<FormattedMessage {...messages.orderQuantity} />}
                    variant="outlined"
                    placeholder="0"
                    autoComplete="off"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    value={quantity}
                    // defaultValue={Number(quantity)}
                    InputProps={{
                      classes: { input: classes.resize },
                      inputProps: {
                        'data-label': `${title}-${variant}`,
                        'data-title': title,
                        'data-variant': variant,
                        'data-price': price,
                        pattern: '[0-9]*',
                        inputMode: 'numeric',
                      },
                    }}
                    className={classes.textField}
                  />
                </Grid>
              ))}
            </Grid>
          </CardActions>
        </Card>
      </Grid>

      <SimpleDialog
        open={open}
        onClose={handleClose}
        title={title}
        image={image}
      />
    </>
  );
}

ProductWithVariants.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   productWithVariants: makeSelectProductWithVariants(),
// });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductWithVariants);
