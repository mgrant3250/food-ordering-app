export function updateCart(prevCart, item, selectedDrink, selectedSide, menu) {
  const itemName = item.name;
  const itemPrice = item.price;

  const sidePrice = menu.sides.find(s => s.name === selectedSide)?.price || 0;
  const drinkPrice = selectedDrink ? 1.99 : 0;
  const totalPrice = item.price + sidePrice + drinkPrice;

  const cartKey = `${itemName} | Side: ${selectedSide || 'None'} | Drink: ${selectedDrink || 'None'}`;

  const existingItem = prevCart[cartKey];

  if (!existingItem) {
    return {
      ...prevCart,
      [cartKey]: {
        price: totalPrice,
        quantity: 1,
        baseItem: item.name,
        side: selectedSide,
        drink: selectedDrink,
      },
    };
  } else {
    return {
      ...prevCart,
      [cartKey]: {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      },
    };
  }
}

export function getTotalItemCount(cart) {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}