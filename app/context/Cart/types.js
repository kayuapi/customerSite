// import { ReactNode, Dispatch } from "react";

// export type Id = string;

// export type CartItem = {
//   id: Id;
//   name: string;
//   price: string;
//   type: "A_LA_CARTE" | "COMBO";
//   quantity: number,
//   variants?: {[key: string]: any}[] | null;
//   comboVariants?: {[key: string]: any}[] | null;
//   subtotal: number,
// };

// export type CartItemAttributeKey =
//   "name" |
//   "price" |
//   "quantity" |
//   "type" |
//   "variants" |
//   "comboVariants"
//   "subtotal";

// export type CartState = {
//   cartItems: CartItem[];
// };
// export type CartItemAttributeValueNameType = string;
// export type CartItemAttributeValuePriceType = string;
// export type CartItemAttributeValueQuantityType = number;
// export type CartItemAttributeValueTypeType = "A_LA_CARTE" | "COMBO";
// export type CartItemAttributeValueVariantsType = {[key: string]: any}[];
// export type CartItemAttributeValueComboVariantsType = {[key: string]: any}[];
// export type CartItemAttributeValueSubtotalType = number;

// export type CartAction =
//   | {
//       type: "updateCartItem";
//       id: Id;
//       attributeKey: CartItemAttributeKey;
//       attributeValue:
//         CartItemAttributeValueNameType |
//         CartItemAttributeValuePriceType |
//         CartItemAttributeValueQuantityType |
//         CartItemAttributeValueTypeType |
//         CartItemAttributeValueVariantsType |
//         CartItemAttributeValueComboVariantsType |
//         CartItemAttributeValueSubtotalType;
//     }
//   | {
//       type: "createCartItem";
//       cartItem: CartItem;
//     }
//   | {
//       type: "deleteCartItem";
//       id: Id;
//     };

// export interface useCartInterface {
//   (): {
//       cartItems: CartItem[];
//       updateCartItem: (id: Id, attributeKey: CartItemAttributeKey, attributeValue: any) => void;
//       createCartItem: (cartItem: CartItem) => void;
//       deleteCartItem: (id: Id) => void;
//   };
// }

// export type CartDispatch = Dispatch<CartAction>;

// export type CartProviderInterface = ({
//   children,
// }: {
//   children: ReactNode;
// }) => JSX.Element;

// // export type AuthProviderInterface = ({
// //   children,
// //   navigate,
// //   auth0_domain,
// //   auth0_audience_domain,
// //   auth0_client_id,
// //   auth0_params,
// //   customPropertyNamespace
// // }: {
// //   children: ReactNode;
// //   navigate: (path: string) => void;
// //   auth0_domain: string;
// //   auth0_audience_domain: string;
// //   auth0_client_id: string;
// //   auth0_params: AuthOptions;
// //   customPropertyNamespace: string;
// // }) => JSX.Element;

// export type CartContextState = {
//   state: CartState;
//   dispatch: CartDispatch;
// };
