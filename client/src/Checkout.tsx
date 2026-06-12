import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutCard from "./components/CheckoutCard";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PK
);

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutCard />
    </Elements>
  );
};

export default Checkout;