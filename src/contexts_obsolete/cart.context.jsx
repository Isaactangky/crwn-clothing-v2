import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const itemFound = cartItems.find((item) => item.id === productToAdd.id);
  // if found, increment quantity
  if (itemFound)
    return [
      ...cartItems.filter((item) => item.id !== itemFound.id),
      { ...itemFound, quantity: itemFound.quantity + 1 },
    ];

  // return new array of modified cartItems
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});
const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};
const INITAIL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled action type (${type}) in cartReducer `);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dipatch] = useReducer(cartReducer, INITAIL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;
  const setIsCartOpen = (bool) => {
    dipatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0
    );
    dipatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItems(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItems(newCartItems);
  };
  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// const [isCartOpen, setIsCartOpen] = useState(false);
// const [cartItems, setCartItems] = useState([]);
// const [cartCount, setCartCount] = useState(0);
// const [cartTotal, setCartTotal] = useState(0);

// useEffect(() => {
//   const newQuantity = cartItems.reduce(
//     (sum, cartItem) => sum + cartItem.quantity,
//     0
//   );
//   setCartCount(newQuantity);
// }, [cartItems]);
// useEffect(() => {
//   const newTotal = cartItems.reduce(
//     (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
//     0
//   );
//   setCartTotal(newTotal);
// }, [cartItems]);
