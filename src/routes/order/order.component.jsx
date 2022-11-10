import "./order.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCheckout,
} from "../../store/cart/cart.selector";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { clearCart, setIsCheckout } from "../../store/cart/cart.action";
const Order = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isCheckout = useSelector(selectIsCheckout);
  useEffect(() => {
    return () => {
      if (isCheckout) {
        dispatch(clearCart());
        dispatch(setIsCheckout(false));
      }
    };
  }, []);
  if (!isCheckout) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="order-container">
      <span className="success-message">Order Completed</span>
      <h2 className="title">Order Summary</h2>
      <div className="order-header">
        <div className="order-block">
          <span>Product</span>
        </div>
        <div className="order-block">
          <span>Description</span>
        </div>
        <div className="order-block">
          <span>Quantity</span>
        </div>
        <div className="order-block">
          <span>Price</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem
          key={cartItem.id}
          isPaymentSuccess={true}
          cartItem={cartItem}
        />
      ))}
      <span className="total">Total: {cartTotal}</span>
      {/* <PaymentFrom /> */}
    </div>
  );
};
export default Order;
