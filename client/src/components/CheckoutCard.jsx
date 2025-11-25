import "./CheckoutCard.css";
import { useSelector, useDispatch } from 'react-redux';
import PaymentForm from './payments/PaymentForm';
import { postOrder } from '../api/order';
import { removeFromCart, clearCart } from '../store/cartSlice';

const CheckoutCard = () => {
  const TAX_RATE = 0.07;

  const cart = useSelector(state => state.cart ?? { items: [] }); // get cart slice
  const dispatch = useDispatch();


  const subtotal = cart?.items?.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  ) || 0;

  const totalWithTax = subtotal + subtotal * TAX_RATE;

   const handleRemove = (id) => {
    dispatch(removeFromCart(id)); 
  };

    const handleClear = () => {
    dispatch(clearCart());
  };

  const handleOrderSuccess = async () => {
    const token = localStorage.getItem('token'); 
    const user = JSON.parse(localStorage.getItem('user')); 

    const orderData = {
      email: user.email, 
      cart: cart.items.map(i => ({
      cartItemId: i.cartItemId,
      baseItem: i.baseItem,
      options: i.options,
      quantity: i.quantity,
      totalPrice: i.totalPrice
  })),
      total: parseFloat(totalWithTax.toFixed(2))
    };

    try{
      const result = await postOrder(token, orderData)
    
      if (result.success) {
        alert('Order placed successfully!');
        dispatch(clearCart())
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
            {cart?.items?.map((item) => (
                <div key={item.cartItemId} className="cart-row">
                    <span>
                      {item.baseItem.name} <br />
                      <small>Side: {item.options?.side || 'None'} 
                        | Drink: {item.options?.drink || 'None'} 
                        | Sauce: {item.options?.sauce}</small>
                    </span>
                    <span>${(item.totalPrice * item.quantity).toFixed(2)}</span>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleRemove(item.cartItemId)} className='remove-btn'>Remove Item</button>
                </div>
            ))}
        </div>
        <div className="subtotal-container">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
            <span>Tax:</span>
            <span>${(subtotal * TAX_RATE).toFixed(2)}</span>
            <span>Subtotal: </span>
            <span>${(totalWithTax).toFixed(2)}</span>
        </div>

      <PaymentForm
        amount={Math.round(totalWithTax * 100)}
        onSuccess={handleOrderSuccess}
      />

      <button onClick={handleClear} className='clear-btn'>Clear Cart</button>
    </div>
  );
};

export default CheckoutCard;