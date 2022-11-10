import { CART_ACTION_TYPES } from "./cart.types";
const INITAIL_STATE = {
  isCartOpen: false,
  cartItems: [],
  isCheckout: false,
};
export const cartReducer = (state = INITAIL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        isCartOpen: false,
        cartItems: [],
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CHECKOUT:
      return {
        ...state,
        isCheckout: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};
