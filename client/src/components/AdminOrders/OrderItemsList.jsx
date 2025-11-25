import React from 'react'

const OrderItemsList = ({ cart }) => (
  <ul>
    {cart?.map((item) => {
      const { cartItemId, quantity = 1, baseItem, options = {} } = item;

      return (
        <li key={cartItemId || baseItem?._id}>
          {quantity}× {baseItem?.name || "Unknown item"}
          (Side: {options.side || "None"}, Sauce: {options.sauce || "None"},
          Drink: {options.drink || "None"})
        </li>
      );
    })}
  </ul>
);

export default OrderItemsList