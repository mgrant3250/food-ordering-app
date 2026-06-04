import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import menuReducer from "./menuSlice"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart")
    if (!serializedState) return undefined

    return {
      cart: JSON.parse(serializedState),
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err)
    return undefined
  }
}


const saveState = (state: RootState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart))
  } catch (err) {
    console.error("Failed to save cart to localStorage", err)
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
})


export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch


store.subscribe(() => {
  saveState(store.getState())
})