import { API_ENDPOINTS } from "./endpoints";

export const getPaymentIntent = async(token, amount) => {
    const res = await fetch(API_ENDPOINTS.payment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create payment intent");
  }

  return res.json();
}