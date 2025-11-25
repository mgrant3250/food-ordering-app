import { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import OrderCard from "./OrderCard";
import Spinner from "../Spinner";
import "./AdminOrders.css";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrders = async () => {
      try {
        const data = await getOrders(signal);

        if (!data.success) throw new Error(data.message || "Failed to load orders");
        setOrders(data.orders || []);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
          return;
        }
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      controller.abort();
    };
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
