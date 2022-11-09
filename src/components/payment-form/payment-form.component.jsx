import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFromContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessingPayment(true);
    // create payment intent
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    const {
      paymentIntent: { client_secret },
    } = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "GUEST",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      console.log(paymentResult.error);
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      alert("payment successful");
    }
  };
  return (
    <PaymentFromContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFromContainer>
  );
};

export default PaymentFrom;
