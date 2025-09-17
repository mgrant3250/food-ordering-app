import React from 'react'
import CheckoutCard from './components/CheckoutCard'

const Checkout = ({cart, setCart, count, setCount}) => {
  return (
    <CheckoutCard cart={cart} setCart={setCart} count={count} setCount={setCount} />
  )
}

export default Checkout