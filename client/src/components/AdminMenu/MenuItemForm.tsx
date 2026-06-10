import type { MenuItem, MenuType } from "../../types/menu"


export type MenuFormState = {
  name: string;
  price: string;
  type: MenuType;
  image: File | null;
  description: string;
};

type MenuItemFormProps = {
    form: MenuFormState;
    setForm: React.Dispatch<React.SetStateAction<MenuFormState>>;
    editingItem: MenuItem | null;
    loading: boolean;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    handleCancelEdit: () => void;
}



const MenuItemForm = ({
    form, 
    setForm, 
    editingItem, 
    loading, 
    handleSubmit, 
    handleCancelEdit}: MenuItemFormProps) => {
    const updateForm = <K extends keyof MenuFormState>(
  field: K,
  value: MenuFormState[K]
) => {
  setForm(prev => ({
    ...prev,
    [field]: value,
  }));
};
    return(
    <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} />
            <input placeholder="Price" type="number" value={form.price} onChange={(e) => updateForm("price", e.target.value)} />
            <select value={form.type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateForm("type", e.target.value as MenuType)}>
              <option value="entree">Entree</option>
              <option value="side">Side</option>
              <option value="drink">Drink</option>
            </select>
    
            <input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm("image", e.target.files?.[0] || null)} />
    
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                style={{ marginTop: "10px", width: "120px", borderRadius: "6px" }}
              />
            )}
    
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateForm("description", e.target.value)}
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
    )
}

export default MenuItemForm