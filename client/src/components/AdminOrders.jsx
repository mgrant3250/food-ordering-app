import { useEffect, useState } from "react";
import { getOrders } from "../api/order";
import "./AdminOrders.css";

const formatDate = (date) => {
  if (!date) return "Unknown date";
  return new Date(date).toLocaleString();
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        if (data.success) setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <p><strong>Email:</strong> {order.email || "Unknown"}</p>
              <p><strong>Total:</strong> ${Number(order.total || 0).toFixed(2)}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <ul>
                {order.cart?.map((item) => {
                  const baseName = item.baseItem?.name || "Unknown item";
                  const side = item.options?.side || "None";
                  const sauce = item.options?.sauce || "None";
                  const drink = item.options?.drink || "None";
                  const quantity = item.quantity || 1;

                  return (
                    <li key={item.cartItemId || Math.random()}>
                      {quantity}× {baseName} (Side: {side}, Sauce: {sauce}, Drink: {drink})
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;