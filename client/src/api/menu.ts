import { API_ENDPOINTS } from "./endpoints";
import { MenuItem, MenuResponse } from "../types/menu";
import { fetchJSON } from "./fetchJSON";

/* -------------------- Types -------------------- */


export type ApiResponse = {
  success: boolean;
  message?: string;
};

export type ApiResponseWithItem<T> = ApiResponse & {
  item: T;
};

/* ------------- Helper Functions --------------------- */

const authHeader = (token: string | null) : HeadersInit =>
  token ? { Authorization: `Bearer ${token}` } : {};

/* -------------------- API Functions -------------------- */

/**
 * Get full menu
 */
export const fetchMenu = (): Promise<MenuResponse> => {
  return fetchJSON<MenuResponse>(API_ENDPOINTS.menu);
};

/**
 * Create menu item
 */
export const postMenu = (
  token: string | null,
  formData: FormData
): Promise<ApiResponseWithItem<MenuItem>> => {
  return fetchJSON<ApiResponseWithItem<MenuItem>>(API_ENDPOINTS.menu, {
    method: "POST",
    headers: authHeader(token),
    body: formData,
  });
};

/**
 * Update menu item
 */
export const updateMenuItem = (
  id: string,
  token: string | null,
  formData: FormData
): Promise<ApiResponseWithItem<MenuItem>> => {
  return fetchJSON<ApiResponseWithItem<MenuItem>>(
    API_ENDPOINTS.menuItemEndPoint(id),
    {
      method: "PUT",
      headers: authHeader(token),
      body: formData,
    }
  );
};

/**
 * Delete menu item
 */
export const deleteMenuItem = (
  id: string,
  token: string | null
): Promise<ApiResponse> => {
  return fetchJSON<ApiResponse>(
    API_ENDPOINTS.menuItemEndPoint(id),
    {
      method: "DELETE",
      headers: authHeader(token),
    }
  );
};