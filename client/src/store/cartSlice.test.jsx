import cartReducer, { addToCart, removeFromCart, changeQty, clearCart } from "./cartSlice";

describe("cartSlice reducer", () => {
  const initialState = {
    items: [],
    total: 0,
  };

  const sampleItem = {
    cartItemId: "1",
    name: "Burger",
    totalPrice: 10,
  };

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addToCart for a new item", () => {
    const state = cartReducer(initialState, addToCart(sampleItem));

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.total).toBe(10);
  });

  it("should increment quantity if the item already exists", () => {
    const stateWithItem = {
      items: [{ ...sampleItem, quantity: 1 }],
      total: 10,
    };

    const state = cartReducer(stateWithItem, addToCart(sampleItem));

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.total).toBe(20);
  });

  it("should handle removeFromCart", () => {
    const stateWithItem = {
      items: [{ ...sampleItem, quantity: 2 }],
      total: 20,
    };

    const state = cartReducer(stateWithItem, removeFromCart("1"));

    expect(state.items.length).toBe(0);
    expect(state.total).toBe(0);
  });

  it("should handle changeQty increasing quantity", () => {
    const stateWithItem = {
      items: [{ ...sampleItem, quantity: 1 }],
      total: 10,
    };

    const state = cartReducer(stateWithItem, changeQty({ id: "1", amount: 2 }));

    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBe(30);
  });

  it("should handle changeQty decreasing quantity and remove item if quantity <= 0", () => {
    const stateWithItem = {
      items: [{ ...sampleItem, quantity: 2 }],
      total: 20,
    };

    const state = cartReducer(stateWithItem, changeQty({ id: "1", amount: -2 }));

    expect(state.items.length).toBe(0);
    expect(state.total).toBe(0);
  });

  it("should handle clearCart", () => {
    const stateWithItems = {
      items: [{ ...sampleItem, quantity: 2 }],
      total: 20,
    };

    const state = cartReducer(stateWithItems, clearCart());

    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
  });
});
