import { useState, useEffect } from "react";
import AdminMenu from "./components/AdminMenu";
import AdminOrders from "./components/AdminOrders";
import AdminUsers from "./components/AdminUsers";

const AdminDashboard = () => {
  const [tab, setTab] = useState("menu");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav className="admin-nav">
        <button onClick={() => setTab("menu")}>Menu Items</button>
        <button onClick={() => setTab("orders")}>Orders</button>
        <button onClick={() => setTab("users")}>Users</button>
      </nav>

      {tab === "menu" && <AdminMenu />}
      {tab === "orders" && <AdminOrders />}
      {tab === "users" && <AdminUsers />}
    </div>
  );
};

export default AdminDashboard;