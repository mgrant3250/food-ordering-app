export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const API_ENDPOINTS = {
  menu: `${API_URL}/api/menu`,
  order: `${API_URL}/api/order`,
  login: `${API_URL}/api/login`,
  register: `${API_URL}/api/register`,
  adminOrder: `${API_URL}/api/admin/orders`,
  forgotPassword: `${API_URL}/api/forgot-password`,
  payment: `${API_URL}/api/create-payment-intent`,
  resetPassword: `${API_URL}/api/reset-password`,

  menuItemEndPoint: (id: string): string =>
    `${API_URL}/api/menu/${id}`,

  changeRole: (id: string): string =>
    `${API_URL}/api/admin/user/${id}/role`,

  adminUsers: (id?: string): string =>
    `${API_URL}/api/admin/users/${id ?? ""}`,

  deleteUser: (id: string): string =>
    `${API_URL}/api/admin/user/${id}`,
} as const;
