import { API_ENDPOINTS } from "./endpoints";

export const fetchMenu = async () => {
    const response = await fetch(API_ENDPOINTS.menu)
    if(!response.ok){
        throw new Error("Failed to fetch menu")
    }
    return response.json();
}

export const postMenu = async(token, formData) => {
    const response = await fetch(API_ENDPOINTS.menu, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();
  return data
}

export const updateMenuItem = async (id, token, formData) => {
    const response = await fetch(`${API_ENDPOINTS.menu}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    return data;
};

// Delete a menu item
export const deleteMenuItem = async (id, token) => {
    const response = await fetch(`${API_ENDPOINTS.menu}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
};