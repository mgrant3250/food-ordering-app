import { useState } from "react";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("main");

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/admin/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, type }),
    });

    const data = await response.json();
    if (data.success) alert("Menu item added!");
    else alert("Error adding item.");
  };

  return (
    <div className="admin-menu-container">
    <h2>Add Menu Item</h2>
    <form onSubmit={handleAdd}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="main">Main</option>
        <option value="side">Side</option>
        <option value="drink">Drink</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
    </div>
  );
};

export default AdminMenu;