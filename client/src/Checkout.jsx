import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutCard from './components/CheckoutCard'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = ({cart, setCart, count, setCount}) => {
  return (
    <Elements stripe={stripePromise}>
    <CheckoutCard cart={cart} setCart={setCart} count={count} setCount={setCount} />
    </Elements>
  )
}

export default Checkout