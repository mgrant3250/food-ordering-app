import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import menuReducer from "./menuSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    return { cart: JSON.parse(serializedState) };
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    auth: authReducer
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});