import React, { createContext, useReducer, useEffect, useState } from "react";

import { cartReducer } from "./cartReducer";
// import {
//   CartProviderInterface,
//   CartState,
//   CartAction,
//   CartContextState
// } from "./types";

function getDefaultState() {
    const DEFAULT_STATE = {
      cartItems: [],
    };

    let stored_state = {};

    return {
      ...DEFAULT_STATE,
      ...stored_state
    };
}

export const CartContext = createContext({
    state: getDefaultState(),
    dispatch: () => {},
});

export const CartProvider = ({
    children,
}) => {
    // Holds working area's menu items state
    const [state, dispatch] = useReducer(
      cartReducer,
      getDefaultState()
    );

    const [contextValue, setContextValue] = useState({
      state,
      dispatch,
    });

    // Update context value and trigger re-render
    // This patterns avoids unnecessary deep renders
    // https://reactjs.org/docs/context.html#caveats
    useEffect(() => {
        setContextValue((contextValue) => ({
            ...contextValue,
            state
        }));
    }, [state]);

    // Verify user is logged-in on AuthProvider mount
    // Avoids storing sensitive data in local storage
    // useEffect(() => {
    //     dispatch({
    //         type: "startAuthenticating"
    //     });

    //     auth0.checkSession({}, (err, authResult) => {
    //         dispatch({
    //             type: "stopAuthenticating"
    //         });

    //         console.log(err);
    //         if (err) {
    //             dispatch({
    //                 type: "error",
    //                 errorType: "checkSession",
    //                 error: err
    //             });
    //         } else {
    //             handleAuthResult({ dispatch, auth0, authResult });
    //         }
    //     });
    // }, []);

    return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    );
};
