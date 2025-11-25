import OrderItemsList from "./OrderItemsList";

const formatDate = (date) => {
  if (!date) return "Unknown date";
  return new Date(date).toLocaleString();
};

const OrderCard = ({ order }) => (
  <div className="order-card">
    <p><strong>Email:</strong> {order.email || "Unknown"}</p>
    <p><strong>Total:</strong> ${Number(order.total || 0).toFixed(2)}</p>
    <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
    <OrderItemsList cart={order.cart} />
  </div>
);

export default OrderCard