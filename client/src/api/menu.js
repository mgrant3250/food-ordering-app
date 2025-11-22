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