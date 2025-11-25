import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
        const existing = state.items.find(i => i.cartItemId === item.cartItemId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.total = state.items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.cartItemId !== id);
      state.total = state.items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);
    },

    changeQty: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.items.find(i => i.cartItemId === id)

      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            state.items = state.items.filter(i => i.cartItemId !== id);
        }
      }

      state.total = state.items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
