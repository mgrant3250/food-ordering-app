import { API_ENDPOINTS } from "./endpoints";
import { MenuItem, MenuResponse } from "../types/menu";
import { fetchJSON, fetchAuthJSON } from "./fetchJSON";

/* -------------------- Types -------------------- */


export type ApiResponse = {
  success: boolean;
  message?: string;
};

export type ApiResponseWithItem<T> = ApiResponse & {
  data: T;
};

/* -------------------- API Functions -------------------- */

/**
 * Get full menu
 */
export const fetchMenu = (): Promise<MenuResponse> =>
  fetchJSON<MenuResponse>(API_ENDPOINTS.menu);


/**
 * Create menu item
 */
export const postMenu = (
  token: string,
  formData: FormData
): Promise<ApiResponseWithItem<MenuItem>> => 
  fetchAuthJSON<ApiResponseWithItem<MenuItem>>(API_ENDPOINTS.menu, token, {
    method: "POST",
    body: formData,
  });

/**
 * Update menu item
 */
export const updateMenuItem = (
  id: string,
  token: string,
  formData: FormData
): Promise<ApiResponseWithItem<MenuItem>> =>
  fetchAuthJSON<ApiResponseWithItem<MenuItem>>(
    API_ENDPOINTS.menuItemEndPoint(id),
    token,
    {
      method: "PUT",
      body: formData,
    }
  );

/**
 * Delete menu item
 */
export const deleteMenuItem = (
  id: string,
  token: string
): Promise<ApiResponse> =>
  fetchAuthJSON<ApiResponse>(
    API_ENDPOINTS.menuItemEndPoint(id),
    token,
    {
      method: "DELETE",
    }
  );