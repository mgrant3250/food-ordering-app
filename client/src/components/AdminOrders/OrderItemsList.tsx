import React from "react";
import type { CartItem } from "../../types/Cart";

/* -------------------- Types -------------------- */

// type MenuItem = {
//   _id: string;
//   name: string;
// };

// type CartOptions = {
//   side?: string;
//   sauce?: string;
//   drink?: string;
// };

// type CartItem = {
//   cartItemId?: string;
//   quantity?: number;
//   baseItem?: MenuItem;
//   options?: CartOptions;
// };

type OrderItemsListProps = {
  cart?: CartItem[];
};

/* -------------------- Component -------------------- */

const OrderItemsList: React.FC<OrderItemsListProps> = ({ cart }) => {
  if (!cart || cart.length === 0) return null;

  return (
    <ul>
      {cart.map((item) => {
        const {
          cartItemId,
          quantity = 1,
          baseItem,
          options = {},
        } = item;

        return (
          <li key={cartItemId ?? baseItem?._id}>
            {quantity}× {baseItem?.name ?? "Unknown item"} (
            Side: {options.side ?? "None"},{" "}
            Sauce: {options.sauce ?? "None"},{" "}
            Drink: {options.drink ?? "None"})
          </li>
        );
      })}
    </ul>
  );
};

export default OrderItemsList;