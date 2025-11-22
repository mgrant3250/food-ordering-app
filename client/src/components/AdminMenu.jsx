import { useState } from "react";
import "./AdminMenu.css";
import { postMenu } from "../api/menu";

const AdminMenu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("entree");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const[loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !price || !type) {
  alert("Please fill out all required fields.");
  return;
}

if (type === "entree" && !image) {
  alert("Entrees require an image.");
  return;
}
    const token = localStorage.getItem("token");
    setLoading(true);


    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("image", image);
    formData.append("description", description)

    try{
      const data = await postMenu(token, formData);
      if(!data.success){
        throw new Error(data.message)
  }

  if (data.success) {
  setName("");
  setPrice("");
  setType("entree");
  setImage(null);
  setDescription("");
}

  alert("Added Item")
}catch (err) {
  console.error(err);
  alert("Error adding item: " + err.message);
}finally{
  setLoading(false)
}

  

  };


  return (
    <div className="admin-menu-container">
    <h2>Add Menu Item</h2>
    <form onSubmit={handleAdd}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="entree">Entree</option>
        <option value="side">Side</option>
        <option value="drink">Drink</option>
      </select>

      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

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
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Item"}
      </button>
    </form>
    </div>
  );
};

export default AdminMenu;