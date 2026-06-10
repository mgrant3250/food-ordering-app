import { API_ENDPOINTS } from "./endpoints";

/* -------------------- Types -------------------- */

export type PaymentIntentResponse = {
  clientSecret: string;
};

export type PaymentErrorResponse = {
  error?: string;
};

export type CreatePaymentIntentResponse = {
  clientSecret: string;
};

/* -------------------- API FUNCTION -------------------- */

export const getPaymentIntent = async (
  token: string,
  amount: number
): Promise<CreatePaymentIntentResponse> => {
  const res = await fetch(API_ENDPOINTS.payment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  
  if (!res.ok) {
    let message = "Failed to create payment intent";

    try {
      const errorData: PaymentErrorResponse = await res.json();
      if (errorData?.error) {
        message = errorData.error;
      }
    } catch {
      // fallback if response is not JSON
    }

    throw new Error(message);
  }

  return res.json();
};