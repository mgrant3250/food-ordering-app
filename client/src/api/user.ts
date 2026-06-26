import { API_ENDPOINTS } from "./endpoints";
import { User, UserRole } from "../types/user";
import { fetchAuthJSON } from "./fetchJSON";
import type { ApiResponse } from "./types";


/* -------------------- API FUNCTIONS -------------------- */

/**
 * Get all users (admin)
 */
export const getUsers = (token: string): Promise<ApiResponse<User[]>> => {

  return fetchAuthJSON<ApiResponse<User[]>>(
    API_ENDPOINTS.adminUsers(),
    token,
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

  return fetchAuthJSON<ApiResponse<User>>(
    API_ENDPOINTS.changeRole(id),
    token,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

  return fetchAuthJSON<ApiResponse<null>>(
    API_ENDPOINTS.deleteUser(id),
    token,
    {
      method: "DELETE",
    }
  );
};