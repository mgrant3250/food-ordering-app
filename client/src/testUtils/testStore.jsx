import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice"; 


export const renderWithStore = (ui, { preloadedState = {}, store } = {}) => {
  const testStore =
    store ||
    configureStore({
      reducer: {
        auth: authReducer,
        cart: cartReducer,
      },
      preloadedState,
    });

  return {
    store: testStore,
    ...render(<Provider store={testStore}>{ui}</Provider>),
  };
};
