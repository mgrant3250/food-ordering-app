import { API_ENDPOINTS } from "./endpoints";

export const fetchMenu = async () => {
    const response = await fetch(API_ENDPOINTS.menu)
    if(!response.ok){
        throw new Error("Failed to fetch menu")
    }
    return response.json();
}