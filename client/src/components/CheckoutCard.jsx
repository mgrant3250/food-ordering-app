import {useState} from 'react'
import './CheckoutCard.css'
import {getTotalItemCount} from '../utils/cartUtils'

const CheckoutCard = ({cart, setCart, count, setCount}) => {

    const removeItem = (itemName) => {
    const newCart = { ...cart };
    delete newCart[itemName];
    setCart(newCart);
    setCount(getTotalItemCount(newCart))
  };

    const clearCart = () => {
        setCart({});
        setCount(0)
    }

    const subtotal = Object.values(cart).reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
  return (
    <>
        <div className="cart">
            <div className="table-head">
                <span>Item</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Actions</span>
            </div>
            {Object.entries(cart).map(([key, value]) => (
                <div key={key} className="cart-row">
                    <span>
                      {value.baseItem} <br />
                      <small>Side: {value.side || 'None'} | Drink: {value.drink || 'None'}</small>
                    </span>
                    <span>${(value.price * value.quantity).toFixed(2)}</span>
                    <span>{value.quantity}</span>
                    <button onClick={() => removeItem(key)} className='remove-btn'>Remove Item</button>
                </div>
            ))}
        </div>
        <div className="subtotal-container">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
            <span>Tax:</span>
            <span>${(subtotal *0.07).toFixed(2)}</span>
            <span>Subtotal: </span>
            <span>${(subtotal + subtotal * 0.07).toFixed(2)}</span>
        </div>
        <div className="cart-buttons">
        <button onClick={clearCart} className="clear-btn">Clear Cart</button>
        <button className="checkout-btn">Checkout</button>
        </div>
    </>
  )
}

export default CheckoutCard