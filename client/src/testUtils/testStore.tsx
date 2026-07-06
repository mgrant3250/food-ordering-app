// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import { render } from "@testing-library/react";

// import authReducer from "../store/authSlice";
// import cartReducer from "../store/cartSlice"; 


// export const renderWithStore = (ui, { preloadedState = {}, store } = {}) => {
//   const testStore =
//     store ||
//     configureStore({
//       reducer: {
//         auth: authReducer,
//         cart: cartReducer,
//       },
//       preloadedState,
//     });

//   return {
//     store: testStore,
//     ...render(<Provider store={testStore}>{ui}</Provider>),
//   };
// };


import React, { ReactElement } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";

import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import menuReducer from "../store/menuSlice";
import type { RootState } from "../store/store";

const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      menu: menuReducer,
    },
    preloadedState: preloadedState as RootState,
  });

type AppStore = ReturnType<typeof createTestStore>;

interface ExtendedRenderOptions
  extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithStore(
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>,
      renderOptions
    ),
  };
}