import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

const addCartItem = (cartItems, productToAdd) => {
  const itemFound = cartItems.find((item) => item.id === productToAdd.id);
  if (itemFound)
    return [
      ...cartItems.filter((item) => item.id !== itemFound.id),
      { ...itemFound, quantity: itemFound.quantity + 1 },
    ];
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  const itemFound = cartItems.find((item) => item.id === cartItemToRemove.id);
  if (itemFound.quantity === 1)
    return clearCartItem(cartItems, cartItemToRemove);
  return [
    ...cartItems.filter((cartItem) => cartItem.id !== itemFound.id),
    { ...itemFound, quantity: itemFound.quantity - 1 },
  ];
};
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
