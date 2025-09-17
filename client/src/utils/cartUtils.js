export function updateCart(prevCart, item) {
  const itemName = item.name;
  const itemPrice = item.price;

  const existingItem = prevCart[itemName];

  if (!existingItem) {
    return {
      ...prevCart,
      [itemName]: {
        price: itemPrice,
        quantity: 1,
      },
    };
  } else {
    return {
      ...prevCart,
      [itemName]: {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      },
    };
  }
}

export function getTotalItemCount(cart) {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}