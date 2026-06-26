import Stripe from "stripe";
import { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CreatePaymentBody {
  amount: number;
}

export const createPayment = async (
  req: Request<{}, {}, CreatePaymentBody>,
  res: Response
): Promise<void> => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({
        error: "Invalid payment amount",
      });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);

    res.status(500).json({
      error: "Payment creation failed",
    });
  }
};