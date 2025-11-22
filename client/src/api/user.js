import { API_ENDPOINTS } from "./endpoints";

export const changeRole = async (id, newRole) => {
    const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.changeRole(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
    let data = await res.json();
    return data
}

export const getUsers = async () => {
    const token = localStorage.getItem("token");

      const res = await fetch(API_ENDPOINTS.AdminUsers(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data
}

export const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.deleteUser(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data
}