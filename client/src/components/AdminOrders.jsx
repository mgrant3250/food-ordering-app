import { useEffect, useState } from "react";
import { getOrders } from "../api/order";
import "./AdminOrders.css";


const formatDate = (date) => new Date(date).toLocaleString();

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const data = await getOrders();
        if (data.success) setOrders(data.orders);
      }catch(err){
        console.log(err)
      }finally{
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
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <ul>
                {order.cart.map((item, i) => (
                  <li key={i}>
                    {item.quantity}× {item.baseItem} ({item.side || "No side"})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;