import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getPaymentIntent } from "../../api/payment";
import "./PaymentForm.css";

type PaymentFormProps = {
  amount: number;
  onSuccess?: () => void | Promise<void>;
  disabled?: boolean;
};

type PaymentIntentResponse = {
  clientSecret: string;
};

const PaymentForm = ({amount, onSuccess, disabled = false}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const { clientSecret }: PaymentIntentResponse =
        await getPaymentIntent(token, amount);

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card information is missing");
      }

      const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (result.error) {
        alert(result.error.message);
      } else if (
        result.paymentIntent?.status === "succeeded"
      ) {
        alert("Payment successful!");

        if (onSuccess) {
          await onSuccess();
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Payment failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <button
        type="submit"
        className="payment-submit"
        disabled={
          !stripe ||
          loading ||
          disabled
        }
      >
        {loading
          ? "Processing..."
          : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;