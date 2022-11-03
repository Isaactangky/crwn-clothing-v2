import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingBagIcon className="shopping-bag" />
      <span className="item-count">{totalQuantity}</span>
    </div>
  );
};

export default CartIcon;
