import { useState } from 'react';
import "./CheckoutCard.css";
import PaymentForm from './payments/PaymentForm';
import { postOrder } from '../api/order';
import { getTotalItemCount } from '../utils/cartUtils';

const CheckoutCard = ({ cart, setCart, count, setCount }) => {
  const TAX_RATE = 0.07;

  const subtotal = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalWithTax = subtotal + subtotal * TAX_RATE;

  const removeItem = (itemName) => {
    const newCart = { ...cart };
    delete newCart[itemName];
    setCart(newCart);
    setCount(getTotalItemCount(newCart));
  };

  const clearCart = () => {
    setCart({});
    setCount(0);
  };

  const handleOrderSuccess = async () => {
    const token = localStorage.getItem('token'); 
    const user = JSON.parse(localStorage.getItem('user')); 

    const orderData = {
      email: user.email, 
      cart: Object.values(cart),
      total: parseFloat(totalWithTax.toFixed(2))
    };

    try{
      const result = await postOrder(token, orderData)
    
      if (result.success) {
        alert('Order placed successfully!');
        clearCart();
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Error placing order.');
    }
  };

  return (
    <div>
      
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

      <PaymentForm
        amount={Math.round(totalWithTax * 100)}
        onSuccess={handleOrderSuccess}
      />

      <button onClick={clearCart} className='clear-btn'>Clear Cart</button>
    </div>
  );
};

export default CheckoutCard;