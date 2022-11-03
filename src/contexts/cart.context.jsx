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
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    const newQuantity = cartItems.reduce((sum, cur) => sum + cur.quantity, 0);
    setTotalQuantity(newQuantity);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    totalQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
