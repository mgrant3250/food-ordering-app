import OrderItemsList from "./OrderItemsList";
import { CartItem } from "../../types/Cart";

/* -------------------- Types -------------------- */

// type CartItem = {
//   cartItemId?: string;
//   quantity?: number;
//   baseItem?: {
//     _id: string;
//     name: string;
//   };
//   options?: {
//     side?: string;
//     sauce?: string;
//     drink?: string;
//   };
// };

type Order = {
  email?: string;
  total?: number;
  createdAt?: string | Date;
  cart?: CartItem[];
};

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