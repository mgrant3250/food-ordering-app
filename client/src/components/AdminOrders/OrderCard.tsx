import OrderItemsList from "./OrderItemsList";
import type { Order } from "../../types/order";

/* -------------------- Types -------------------- */


type OrderCardProps = {
  order: Order;
};

/* -------------------- Helpers -------------------- */

const formatDate = (date?: string | Date) => {
  if (!date) return "Unknown date";

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Invalid date";

  return parsed.toLocaleString();
};

/* -------------------- Component -------------------- */

const OrderCard = ({ order }: OrderCardProps) => (
  <div className="order-card">
    <p>
      <strong>Email:</strong> {order.email ?? "Unknown"}
    </p>

    <p>
      <strong>Total:</strong> $
      {Number(order.total ?? 0).toFixed(2)}
    </p>

    <p>
      <strong>Date:</strong> {formatDate(order.createdAt)}
    </p>

    <OrderItemsList cart={order.cart} />
  </div>
);

export default OrderCard;