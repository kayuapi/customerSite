import isEqual from 'lodash.isequal';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'updateCartItem': {
      const { id, attributeKey, attributeValue } = action;
      const newStateCartItems = state.cartItems.map(el => {
        if (el.id === id) {
          if (attributeKey === 'quantity') {
            if (el.quantity + attributeValue !== 0) {
              return {
                ...el,
                quantity: el.quantity + attributeValue,
                subtotal: el.subtotal + attributeValue * el.price,
              };
            }
            return undefined;
          }
          // not support the following now, only support quantity attribute key
          return {
            ...el,
            [attributeKey]: attributeValue,
          };
        }
        return el;
      });
      // get rid of undefined
      const newStateCartItems2 = newStateCartItems.filter(el => el != null);
      return {
        ...state,
        cartItems: newStateCartItems2,
      };
    }

    case 'createCartItem': {
      const { cartItem } = action;

      if (cartItem.type === 'A_LA_CARTE') {
        const IsALaCarteVariant = typeof cartItem.variant !== 'undefined';
        // for no variants a la carte
        if (!IsALaCarteVariant) {
          const existedInCart = state.cartItems.findIndex(
            el => el.id === cartItem.id,
          );
          if (existedInCart === -1) {
            return {
              ...state,
              cartItems: [
                ...state.cartItems,
                {
                  id: cartItem.id,
                  name: cartItem.name,
                  price: cartItem.price,
                  quantity: cartItem.quantity,
                  subtotal: cartItem.price * cartItem.quantity,
                },
              ],
            };
          }
          const cloneCart = [...state.cartItems];
          cloneCart[existedInCart].quantity = cartItem.quantity;
          cloneCart[existedInCart].subtotal =
            cartItem.quantity * cartItem.price;
          return {
            ...state,
            cartItems: cloneCart,
          };
        }
        // for is variant a la carte
        const existedInCart = state.cartItems.findIndex(
          el => el.id === cartItem.id,
        );
        if (existedInCart === -1) {
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                variant: cartItem.variant,
                quantity: cartItem.quantity,
                subtotal: cartItem.price * cartItem.quantity,
              },
            ],
          };
        }
        const cloneCart = [...state.cartItems];
        cloneCart[existedInCart].quantity += cartItem.quantity;
        cloneCart[existedInCart].subtotal += cartItem.quantity * cartItem.price;
        return {
          ...state,
          cartItems: cloneCart,
        };
      }
      if (cartItem.type === 'COMBO') {
        // for combo
        // console.log('**cartItem', cartItem);

        // combo item check existed in cart by name , not by id
        const existedInCart = state.cartItems.findIndex(
          el =>
            el.name === cartItem.name &&
            isEqual(
              cartItem.variant.map(({ name }) => name).sort(),
              el.variant.sort(),
            ),
        );
        if (existedInCart === -1) {
          const subtotal = cartItem.variant.reduce(
            (acc, cur) => acc + cur.price,
            0,
          );
          // console.log('**subtotal', subtotal);
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price + subtotal,
                variant: cartItem.variant.map(eli => eli.name),
                quantity: cartItem.quantity,
                subtotal: cartItem.price + subtotal,
              },
            ],
          };
        }
        const cloneCart = [...state.cartItems];
        cloneCart[existedInCart].quantity += cartItem.quantity;
        cloneCart[existedInCart].subtotal +=
          cartItem.quantity * cloneCart[existedInCart].price;
        return {
          ...state,
          cartItems: cloneCart,
        };
      }
      return {
        ...state,
      };
    }

    case 'deleteCartItem': {
      const { id } = action;
      const newStateMenuItems = state.cartItems.filter(el => el.id !== id);
      return {
        ...state,
        cartItems: newStateMenuItems,
      };
    }

    default:
      return state;
  }
};
