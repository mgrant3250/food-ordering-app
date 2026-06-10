import { API_ENDPOINTS } from "./endpoints";
import { User, UserRole } from "../types/user";
import { fetchJSON } from "./fetchJSON";

/* -------------------- Types -------------------- */


export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  // user?: User;
};

const authHeader = (token: string) : HeadersInit => ({ 
  Authorization: `Bearer ${token}` 
});


/* -------------------- API FUNCTIONS -------------------- */

/**
 * Get all users (admin)
 */
export const getUsers = (token: string): Promise<ApiResponse<User[]>> => {

  return fetchJSON<ApiResponse<User[]>>(
    API_ENDPOINTS.adminUsers(),
    {
      method: "GET",
      headers: authHeader(token)
    }
  );
};

/**
 * Change user role
 */
export const changeRole = (
  token: string,
  id: string,
  newRole: UserRole
): Promise<ApiResponse<User>> => {

  return fetchJSON<ApiResponse<User>>(
    API_ENDPOINTS.changeRole(id),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(token),
      },
      body: JSON.stringify({ role: newRole }),
    }
  );
};

/**
 * Delete user
 */
export const deleteUser = (
  token: string,
  id: string
): Promise<ApiResponse<null>> => {

  return fetchJSON<ApiResponse<null>>(
    API_ENDPOINTS.deleteUser(id),
    {
      method: "DELETE",
      headers: authHeader(token),
    }
  );
};