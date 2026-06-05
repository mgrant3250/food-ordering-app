import { useState, useEffect } from "react";
import "./AdminMenu.css";
import { fetchMenu, postMenu, updateMenuItem, deleteMenuItem } from "../api/menu";

type MenuType = "entree" | "side" | "drink" | "sauce";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
  type: MenuType;
  description: string;
  imageUrl?: string;
};

type MenuResponse = {
  entrees: MenuItem[];
  sides: MenuItem[];
  drinks: MenuItem[];
  sauces: MenuItem[];
};

type MenuItemResponse = {
  success: boolean;
  item: MenuItem;
  message?: string;
};

const AdminMenu = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [type, setType] = useState<MenuType>("entree");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
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

    if (!name || !price || !type) {
      alert("Please fill out all required fields.");
      return;
    }

    if (type === "entree" && !image && !editingItem) {
      alert("Entrees require an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      let data : MenuItemResponse;;
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

      // Reset form
      setName("");
      setPrice("");
      setType("entree");
      setImage(null);
      setDescription("");

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
    setName(item.name);
    setPrice(item.price.toString());
    setType(item.type);
    setDescription(item.description);
    setImage(null);
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
    setName("");
    setPrice("");
    setType("entree");
    setImage(null);
    setDescription("");
  };

  return (
    <div className="admin-menu-container">
      <h2>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <select value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as MenuType)}>
          <option value="entree">Entree</option>
          <option value="side">Side</option>
          <option value="drink">Drink</option>
        </select>

        <input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0] || null)} />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ marginTop: "10px", width: "120px", borderRadius: "6px" }}
          />
        )}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          rows={4}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
          </button>
          {editingItem && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

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