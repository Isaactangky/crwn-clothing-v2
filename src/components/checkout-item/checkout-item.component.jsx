import "./checkout-item.styles.scss";
import {
  removeItemFromCart,
  addItemToCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem, isPaymentSuccess }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        {" "}
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        {!isPaymentSuccess && (
          <div className="arrow" onClick={removeItemHandler}>
            &#10094;
          </div>
        )}
        <span className="value">{quantity}</span>
        {!isPaymentSuccess && (
          <div className="arrow" onClick={addItemHandler}>
            &#10095;
          </div>
        )}
      </span>
      <span className="price">${price}</span>
      {!isPaymentSuccess && (
        <div className="remove-button" onClick={clearItemHandler}>
          &#10005;
        </div>
      )}
    </div>
  );
};

export default CheckoutItem;
