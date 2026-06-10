import { API_ENDPOINTS } from "./endpoints";
import { Order } from "../types/order";
import { fetchJSON } from "./fetchJSON";
import type { CartItem } from "../types/Cart";


export type CreateOrderResponse = {
  success: boolean;
  message?: string;
};

export type GetOrdersResponse = {
  success: boolean;
  message?: string;
  orders: Order[];
};

type OrderPayload = {
  email: string;
  cart: CartItem[];
  total: number;
};

const authHeader = (token: string) : HeadersInit => ({ 
  Authorization: `Bearer ${token}` 
});


/* -------------------- API FUNCTIONS -------------------- */

/**
 * Create a new order
 */
export const postOrder = (
  token: string,
  orderData: OrderPayload
): Promise<CreateOrderResponse> => {
  return fetchJSON<CreateOrderResponse>(API_ENDPOINTS.order, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(orderData),
  });
};

/**
 * Get all admin orders
 */
export const getOrders = (
  token: string,
  signal?: AbortSignal
): Promise<GetOrdersResponse> => {

  return fetchJSON<GetOrdersResponse>(API_ENDPOINTS.adminOrder, {
    method: "GET",
    headers: authHeader(token),
    signal,
  });
};