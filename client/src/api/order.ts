import { API_ENDPOINTS } from "./endpoints";
import { Order } from "../types/order";
import { fetchAuthJSON } from "./fetchJSON";
import type { CartItem } from "../types/Cart";
import type { ApiResponse } from "./types";

type CreateOrderResponse = ApiResponse
type GetOrdersResponse = ApiResponse<Order[]>;

export type OrderPayload = {
  email: string;
  cart: CartItem[];
  total: number;
};


/* -------------------- API FUNCTIONS -------------------- */

/**
 * Create a new order
 */
export const createOrder = (
  token: string,
  orderData: OrderPayload
): Promise<CreateOrderResponse> => 
  fetchAuthJSON<CreateOrderResponse>(API_ENDPOINTS.order,
    token,
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  }
  );

/**
 * Get all admin orders
 */
export const getOrders = (
  token: string,
  signal?: AbortSignal
): Promise<GetOrdersResponse> => 
  fetchAuthJSON<GetOrdersResponse>(
    API_ENDPOINTS.adminOrder, 
    token,
    {signal}
  );