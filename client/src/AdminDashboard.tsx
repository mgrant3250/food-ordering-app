import { useState } from "react";
import AdminMenu from "./components/AdminMenu";
import AdminOrders from "./components/AdminOrders/AdminOrders";
import AdminUsers from "./components/AdminUsers";
import "./AdminDashboard.css";

type AdminTab = "menu" | "orders" | "users";

const tabs: { id: AdminTab; label: string }[] = [
  { id: "menu", label: "Menu Items" },
  { id: "orders", label: "Orders" },
  { id: "users", label: "Users" },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState<AdminTab>("menu");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <nav
        className="admin-nav"
        role="tablist"
        aria-label="Admin dashboard sections"
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`${id}-panel`}
            id={`${id}-tab`}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {tab === "menu" && (
          <section
            id="menu-panel"
            role="tabpanel"
            aria-labelledby="menu-tab"
          >
            <AdminMenu />
          </section>
        )}

        {tab === "orders" && (
          <section
            id="orders-panel"
            role="tabpanel"
            aria-labelledby="orders-tab"
          >
            <AdminOrders />
          </section>
        )}

        {tab === "users" && (
          <section
            id="users-panel"
            role="tabpanel"
            aria-labelledby="users-tab"
          >
            <AdminUsers />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
