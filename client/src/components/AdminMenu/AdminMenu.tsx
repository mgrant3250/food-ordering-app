import { useState, useEffect } from "react";
import "./AdminMenu.css";
import MenuItemForm from "./MenuItemForm";
import { fetchMenu, postMenu, updateMenuItem, deleteMenuItem } from "../../api/menu";
import type { MenuResponse, MenuType, MenuItem } from "../../types/menu";


type MenuItemResponse = {
  success: boolean;
  item: MenuItem;
  message?: string;
};

const initialFormState = {
  name: "",
  price: "",
  type: "entree" as MenuType,
  image: null as File | null,
  description: "",
};

const AdminMenu = () => {
  const [form, setForm] = useState(initialFormState)
  const [loading, setLoading] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const token = localStorage.getItem("token");

  // Load menu items
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data : MenuResponse = await fetchMenu();
        // Combine entrees, sides, drinks if needed
        setMenuItems( data.entrees.concat(data.sides, data.sauces) || []);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    loadMenu();
  }, []);

  // Handle add/update item
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.type) {
      alert("Please fill out all required fields.");
      return;
    }

    if (form.type === "entree" && !form.image && !editingItem) {
      alert("Entrees require an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("type", form.type);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      let data : MenuItemResponse;
      if (editingItem) {
        data = await updateMenuItem(editingItem._id, token, formData);
        setMenuItems(menuItems.map(item => item._id === editingItem._id ? data.item : item));
        setEditingItem(null);
        alert("Item updated!");
      } else {
        data = await postMenu(token, formData);
        setMenuItems([...menuItems, data.item]);
        alert("Item added!");
      }

      setForm(initialFormState)

    } catch (err: unknown) {
      console.error(err);

      const message =
      err instanceof Error
      ? err.message
      : "Unknown error";

      alert("Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing item
  const handleEditClick = (item : MenuItem) => {
    setEditingItem(item);
    setForm({
    name: item.name,
    price: item.price.toString(),
    type: item.type,
    image: null,
    description: item.description,
  });
  };

  // Delete an item
  const handleDelete = async (id : string) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const data = await deleteMenuItem(id, token);
      if (data.success) {
        setMenuItems(menuItems.filter(item => item._id !== id));
        alert("Item deleted!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm(initialFormState)
  };

  return (
    <div className="admin-menu-container">
      <h2>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>

        <MenuItemForm 
        form={form}
        setForm={setForm}
        editingItem={editingItem}
        loading={loading}
        handleSubmit={handleSubmit}
        handleCancelEdit={handleCancelEdit}

        />

      <h3>Current Menu</h3>
      <ul className="menu-list">
        {menuItems.map(item => (
          <li key={item._id} className="menu-item">
            <strong>{item.name}</strong> - ${item.price}
            <div className="menu-actions">
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;