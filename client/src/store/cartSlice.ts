import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, CartState } from "../types/Cart";

const initialState: CartState = {
  items: [],
  total: 0,
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload

      const existing = state.items.find(
        (i) => i.cartItemId === item.cartItemId
      )

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }

      state.total = calculateTotal(state.items)
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (i) => i.cartItemId !== action.payload
      )

      state.total = calculateTotal(state.items)
    },

    changeQty: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const { id, amount } = action.payload

      const item = state.items.find((i) => i.cartItemId === id)

      if (item) {
        item.quantity += amount

        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.cartItemId !== id)
        }
      }

      state.total = calculateTotal(state.items)
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, changeQty, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
