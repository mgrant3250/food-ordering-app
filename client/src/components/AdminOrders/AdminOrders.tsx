import { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import OrderCard from "./OrderCard";
import type { CartItem } from "../../types/Cart";
import Spinner from "../Spinner";
import "./AdminOrders.css";

/* -------------------- Types -------------------- */

type Order = {
  _id: string;
  email?: string;
  total?: number;
  createdAt?: string;
  cart?: CartItem[]; // replace with shared CartItem type if available
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  orders?: T;
};

/* -------------------- Component -------------------- */

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        const data: ApiResponse<Order[]> = await getOrders(controller.signal);

        if (!data.success) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(data.orders ?? []);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Error fetching orders:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
