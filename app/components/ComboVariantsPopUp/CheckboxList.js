import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    padding: '0px',
    minWidth: '0px',
  },
  inputRight: {
    textAlign: 'end',
  },
}));

export default function CheckboxList({
  productToAddToCart,
  setProductToAddToCart,
  items,
  minSelectionNumber,
  maxSelectionNumber,
  required,
  modifyAbidingRules,
}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  React.useEffect(() => {
    if (
      (required &&
        checked.length >= 1 &&
        checked.length >= minSelectionNumber &&
        checked.length <= maxSelectionNumber) ||
      (!required &&
        checked.length <= maxSelectionNumber &&
        checked.length >= minSelectionNumber)
    ) {
      modifyAbidingRules(true);
    } else {
      modifyAbidingRules(false);
    }
  }, [checked]);
  const handleToggle = (id, name, price) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    let newComboVariants = [...productToAddToCart.comboVariants];

    if (
      minSelectionNumber === maxSelectionNumber &&
      Number(maxSelectionNumber) === 1
    ) {
      newChecked.splice(0, newChecked.length);
      // eslint-disable-next-line no-shadow
      const namesInList = items.map(({ name }) => name);
      newComboVariants = newComboVariants.filter(
        el => namesInList.indexOf(el.name) < 0,
      );
      newChecked.push(id);
      newComboVariants.push({
        id,
        name,
        // eslint-disable-next-line no-useless-escape
        price: Number(price.replace(/[^0-9\.]+/g, '')),
      });
      setChecked(newChecked);
      setProductToAddToCart(prev => ({
        ...prev,
        comboVariants: newComboVariants,
      }));
    } else if (!required && Number(maxSelectionNumber) <= 1) {
      if (checked.length === 1) {
        newChecked.splice(0, newChecked.length);
        // eslint-disable-next-line no-shadow
        const namesInList = items.map(({ name }) => name);
        newComboVariants = newComboVariants.filter(
          el => namesInList.indexOf(el.name) < 0,
        );
        // has been checked, now need to switch it
        if (checked[0] !== id) {
          newChecked.push(id);
          newComboVariants.push({
            id,
            name,
            // eslint-disable-next-line no-useless-escape
            price: Number(price.replace(/[^0-9\.]+/g, '')),
          });
        }
      } else {
        newChecked.push(id);
        newComboVariants.push({
          id,
          name,
          // eslint-disable-next-line no-useless-escape
          price: Number(price.replace(/[^0-9\.]+/g, '')),
        });
      }
      setChecked(newChecked);
      setProductToAddToCart(prev => ({
        ...prev,
        comboVariants: newComboVariants,
      }));
    } else if (
      newChecked.indexOf(id) < 0 &&
      newChecked.length + 1 > Number(maxSelectionNumber)
      // eslint-disable-next-line no-empty
    ) {
    } else {
      if (currentIndex === -1) {
        newChecked.push(id);
        newComboVariants.push({
          id,
          name,
          // eslint-disable-next-line no-useless-escape
          price: Number(price.replace(/[^0-9\.]+/g, '')),
        });
      } else {
        newChecked.splice(currentIndex, 1);
        newComboVariants = newComboVariants.filter(el => el.name !== name);
      }
      setChecked(newChecked);
      setProductToAddToCart(prev => ({
        ...prev,
        comboVariants: newComboVariants,
      }));
    }
  };

  return (
    <List dense={false} className={classes.root}>
      {items.map(({ id, name, price }) => {
        const labelId = `checkbox-list-label-${id}`;
        return (
          <ListItem
            key={id}
            role={undefined}
            dense
            button
            onClick={handleToggle(id, name, price)}
          >
            <ListItemIcon classes={{ root: classes.icon }}>
              <Checkbox
                edge="start"
                classes={{ root: classes.icon }}
                checked={checked.indexOf(id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText
              style={{ maxWidth: '80%' }}
              id={labelId}
              primary={name}
            />
            <ListItemSecondaryAction>
              <ListItemText id={labelId} primary={`+${price}`} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

CheckboxList.propTypes = {
  productToAddToCart: PropTypes.object,
  setProductToAddToCart: PropTypes.func,
  items: PropTypes.array,
  minSelectionNumber: PropTypes.number,
  maxSelectionNumber: PropTypes.number,
  required: PropTypes.bool,
  modifyAbidingRules: PropTypes.func,
};
