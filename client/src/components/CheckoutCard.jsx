import "./CheckoutCard.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentForm from "./payments/PaymentForm";
import { postOrder } from "../api/order";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { toast } from 'react-toastify';
import { toastOptions } from "../utils/toastOptions";

const TAX_RATE = 0.07;

const CheckoutCard = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cart = useSelector((state) => state.cart ?? { items: [] });
  const items = cart.items ?? [];

  
  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  
  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrderSuccess = async () => {
    if(isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      toast.error("You must be logged in to place an order.", toastOptions);
      setIsSubmitting(false)
      return;
    }

    const user = JSON.parse(storedUser);

    const orderData = {
      email: user.email,
      cart: items.map((item) => ({
        cartItemId: item.cartItemId,
        baseItem: item.baseItem,
        options: item.options,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      total: Number(total.toFixed(2)),
    };

    try {
      const result = await postOrder(token, orderData);

      if (result?.success) {
        toast.success("Order placed successfully!", toastOptions);
        dispatch(clearCart());
      } else {
        toast.error("Failed to place order.", toastOptions);
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Error placing order.", toastOptions);
    }finally{
      setIsSubmitting(false);
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

        {items.length === 0 && (
          <div className="empty-cart">Your cart is empty.</div>
        )}

        {items.map((item) => (
          <div key={item.cartItemId} className="cart-row">
            <span>
              {item.baseItem.name}
              <br />
              <small>
                Side: {item.options?.side || "None"} | Drink:{" "}
                {item.options?.drink || "None"} | Sauce:{" "}
                {item.options?.sauce || "None"}
              </small>
            </span>

            <span>
              ${(item.totalPrice * item.quantity).toFixed(2)}
            </span>

            <span>{item.quantity}</span>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.cartItemId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="subtotal-container">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>

        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>

        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <PaymentForm
        amount={Math.round(total * 100)} // cents
        onSuccess={handleOrderSuccess}
        disabled={isSubmitting}
      />

      <button className="clear-btn" onClick={handleClearCart} disabled={isSubmitting}>
        Clear Cart
      </button>
    </div>
  );
};

export default CheckoutCard;
