import {useState} from 'react'
import './CheckoutCard.css'
import {getTotalItemCount} from '../utils/cartUtils'

const CheckoutCard = ({cart, setCart, count, setCount}) => {


  const TAX_RATE = 0.07;

  const subtotal = Object.values(cart).reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const totalWithTax = subtotal + (subtotal * TAX_RATE);

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


  const handleCheckout = async () => {

    const token = localStorage.getItem('token'); 
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!token || !user) {
    alert('You must be logged in to place an order.');
    return;
  }

  
  const orderData = {
    email: user.email, 
    cart: Object.values(cart),
    total: parseFloat(totalWithTax.toFixed(2))
  };

  try {
    const response = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Order placed successfully!');
      clearCart();
    } else {
      alert('Failed to place order. Please try again.');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Error placing order.');
  }
};

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
            <span>${(subtotal * TAX_RATE).toFixed(2)}</span>
            <span>Subtotal: </span>
            <span>${(subtotal + subtotal * TAX_RATE).toFixed(2)}</span>
        </div>
        <div className="cart-buttons">
        <button onClick={clearCart} className="clear-btn">Clear Cart</button>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
    </>
  )
}

export default CheckoutCard