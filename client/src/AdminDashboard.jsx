import { useState } from "react";
import AdminMenu from "./components/AdminMenu";
import AdminOrders from "./components/AdminOrders/AdminOrders";
import AdminUsers from "./components/AdminUsers";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState("menu");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <nav className="admin-nav">
        <button
          className={tab === "menu" ? "active" : ""}
          onClick={() => setTab("menu")}
        >
          Menu Items
        </button>
        <button
          className={tab === "orders" ? "active" : ""}
          onClick={() => setTab("orders")}
        >
          Orders
        </button>
        <button
          className={tab === "users" ? "active" : ""}
          onClick={() => setTab("users")}
        >
          Users
        </button>
      </nav>

      <div className="tab-content">
        {tab === "menu" && <AdminMenu />}
        {tab === "orders" && <AdminOrders />}
        {tab === "users" && <AdminUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
