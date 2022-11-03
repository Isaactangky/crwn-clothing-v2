import { createContext, useEffect, useState } from "react";
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
  totalQuantity: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newQuantity = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity,
      0
    );
    setTotalQuantity(newQuantity);
  }, [cartItems]);
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newTotal);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    totalQuantity,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
