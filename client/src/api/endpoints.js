import AdminUsers from "../components/AdminUsers";

export const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  menu: `${API_URL}/api/menu`,
  order: `${API_URL}/api/order`,
  login: `${API_URL}/api/login`,
  register: `${API_URL}/api/register`,
  adminOrder: `${API_URL}/api/admin/orders`,
  changeRole: (id) =>  `${API_URL}/api/admin/user/${id}/role`,
  AdminUsers: (id) =>`${API_URL}/api/admin/users/${id ? id : ""}`,
  deleteUser: (id) => `${API_URL}/api/admin/user/${id}`,
  forgotPassword: `${API_URL}/api/forgot-password`,
  payment: `${API_URL}/api/create-payment-intent`
};
