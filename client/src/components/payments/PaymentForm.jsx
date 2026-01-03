import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getPaymentIntent } from "../../api/payment.js"
import "./PaymentForm.css"


const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) return
    setLoading(true);

    try{
    const token = localStorage.getItem("token");

    const { clientSecret } = await getPaymentIntent( token, amount );

    //  Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      onSuccess?.();
    }
  }catch(err){
    alert(err.message);
  }finally{
    setLoading(false)
  }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className="payment-submit">
        Pay ${(amount / 100).toFixed(2)}
      </button>
    </form>
  );
};

export default PaymentForm;