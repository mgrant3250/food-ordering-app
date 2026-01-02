// import { render, screen, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import FoodCard from "./FoodCard";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { retry: false }, // prevents automatic retries in tests
//     },
//   });

//     return ({ children }) => (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// };

// const mockNavigate = vi.fn();

// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-router-dom"),
//   useNavigate: () => mockNavigate,
// }));


// vi.mock("../utils/cartUtils", () => ({
//   getTotalItemCount: (cart) => Object.values(cart).reduce((a, b) => a + b, 0),
// }));


// const mockMenu = {
//   entrees: [
//     { name: "Burger", price: 10, description: "Tasty burger", imageUrl: "/burger.jpg" },
//     { name: "Pizza", price: 12, description: "Cheesy pizza", imageUrl: "/pizza.jpg" },
//   ],
// };

// describe("FoodCard", () => {
//   beforeEach(() => {
//     vi.restoreAllMocks();
//   });

//   it("renders loading state initially", () => {
//     vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {})); // never resolves
//     render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, { wrapper: createWrapper() });
//     expect(screen.getByText("Loading menu...")).toBeInTheDocument();
//   });

//   it("renders error message on fetch failure", async () => {
//   vi.spyOn(global, "fetch").mockImplementationOnce(() => {
//     return Promise.resolve({
//       ok: false, 
//       json: async () => ({}),
//     });
//   });

//   render(
//     <FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />,
//     { wrapper: createWrapper() }
//   );

//   await waitFor(() => {
//     expect(screen.getByText("Error loading menu.")).toBeInTheDocument();
//   });
// });


//   it("renders menu items correctly", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockMenu,
//     });

//     render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, { wrapper: createWrapper() });

//     // Check that each item is rendered
//     for (const item of mockMenu.entrees) {
//       expect(await screen.findByText(item.name)).toBeInTheDocument();
//       expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
//       expect(screen.getByText(item.description)).toBeInTheDocument();
//       // Check lazy loading
//        const img = screen.getByAltText(item.name);
//        expect(img).toHaveAttribute("src", `http://localhost:5000${item.imageUrl}`);
//        expect(img).toHaveAttribute("loading", "lazy");
//     }
//   });

//   it("calls setCount with total cart items", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockMenu,
//     });

//     const setCountMock = vi.fn();
//     const cart = { Burger: 2, Pizza: 1 };

//     render(<FoodCard cart={cart} setCart={vi.fn()} setCount={setCountMock} />, { wrapper: createWrapper() });
//     await waitFor(() => {
//       expect(setCountMock).toHaveBeenCalledWith(3);
//     });
//   });

// it("navigates to /options with correct state when clicking Add to Cart", async () => {
//   vi.spyOn(global, "fetch").mockResolvedValueOnce({
//     ok: true,
//     json: async () => mockMenu,
//   });

//   render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, {
//     wrapper: createWrapper(),
//   });

//   const buttons = await screen.findAllByRole("button", { name: /add .* to cart/i });

//   // click each Add to Cart button
//   buttons.forEach((button, index) => {
//     button.click();
//     expect(mockNavigate).toHaveBeenCalledWith("/options", {
//       state: {
//         item: mockMenu.entrees[index],
//         menu: mockMenu,
//       },
//     });
//   });
// });
// });


// FoodCard.test.jsx
// import { render, screen, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import FoodCard from "./FoodCard";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { renderWithStore } from "../testUtils/testStore";

// // Mock useNavigate
// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-router-dom"),
//   useNavigate: () => mockNavigate,
// }));

// // Mock cart util
// vi.mock("../utils/cartUtils", () => ({
//   getTotalItemCount: (cart) => Object.values(cart).reduce((a, b) => a + b, 0),
// }));

// // Mock menu response
// const mockMenu = {
//   entrees: [
//     { name: "Burger", price: 10, description: "Tasty burger", imageUrl: "/burger.jpg" },
//     { name: "Pizza", price: 12, description: "Cheesy pizza", imageUrl: "/pizza.jpg" },
//   ],
// };

// // Query provider wrapper
// const createQueryWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { retry: false },
//     },
//   });

//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

// describe("FoodCard Component", () => {
//   beforeEach(() => {
//     vi.restoreAllMocks();
//   });

//   it("renders loading state", () => {
//     vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

//     renderWithStore(<FoodCard />, { wrapper: createQueryWrapper() });
//     expect(screen.getByText("Loading menu...")).toBeInTheDocument();
//   });

//   it("renders error on fetch failure", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: false,
//       json: async () => ({}),
//     });

//     renderWithStore(<FoodCard />, { wrapper: createQueryWrapper() });

//     await waitFor(() =>
//       expect(screen.getByText("Error loading menu.")).toBeInTheDocument()
//     );
//   });

//   it("renders menu items", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockMenu,
//     });

//     renderWithStore(<FoodCard />, { wrapper: createQueryWrapper() });

//     for (const item of mockMenu.entrees) {
//       expect(await screen.findByText(item.name)).toBeInTheDocument();
//       expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
//       expect(screen.getByText(item.description)).toBeInTheDocument();

//       const img = screen.getByAltText(item.name);
//       expect(img).toHaveAttribute("src", `http://localhost:5000${item.imageUrl}`);
//       expect(img).toHaveAttribute("loading", "lazy");
//     }
//   });

//   it("calculates cart count correctly", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockMenu,
//     });

//     const preloadedState = {
//       cart: {
//         items: [{ name: "Burger", quantity: 2 }, { name: "Pizza", quantity: 1 }],
//       },
//     };

//     renderWithStore(<FoodCard />, {
//       wrapper: createQueryWrapper(),
//       preloadedState,
//     });

//     await waitFor(() => {
//       const countText = screen.getByText(/3 items/i);
//       expect(countText).toBeInTheDocument();
//     });
//   });

//   it("navigates on Add to Cart click", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockMenu,
//     });

//     renderWithStore(<FoodCard />, { wrapper: createQueryWrapper() });

//     const buttons = await screen.findAllByRole("button", {
//       name: /add .* to cart/i,
//     });

//     buttons[0].click();

//     expect(mockNavigate).toHaveBeenCalledWith("/options", {
//       state: {
//         item: mockMenu.entrees[0],
//         menu: mockMenu,
//       },
//     });
//   });
// });

// FoodCard.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FoodCard from "./FoodCard";
import menuReducer from "../store/menuSlice"; // adjust path
import cartReducer from "../store/cartSlice"; // adjust path

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock cart utility
vi.mock("../utils/cartUtils", () => ({
  getTotalItemCount: (cart) =>
    Object.values(cart).reduce((a, b) => a + b, 0),
}));

// Sample menu data
const mockMenu = {
  entrees: [
    { name: "Burger", price: 10, description: "Tasty burger", imageUrl: "/burger.jpg" },
    { name: "Pizza", price: 12, description: "Cheesy pizza", imageUrl: "/pizza.jpg" },
  ],
};

// Setup Redux test store
const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: { menu: menuReducer, cart: cartReducer },
    preloadedState,
  });

const renderWithProviders = (ui, { preloadedState } = {}) => {
  const store = createTestStore(preloadedState);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Provider>
  );
};

describe("FoodCard Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<FoodCard />, {
      preloadedState: {
        menu: { entrees: [], loading: true, error: null },
        cart: { items: [] },
      },
    });

    expect(screen.getByText("Loading menu...")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    renderWithProviders(<FoodCard />, {
      preloadedState: {
        menu: { entrees: [], loading: false, error: "Error loading menu" },
        cart: { items: [] },
      },
    });

    expect(await screen.findByText("Error loading menu.")).toBeInTheDocument();
  });

  it("renders menu items correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockMenu,
    });

    renderWithProviders(<FoodCard />, {
      preloadedState: {
        menu: { entrees: mockMenu.entrees, loading: false, error: null },
        cart: { items: [] },
      },
    });

    for (const item of mockMenu.entrees) {
      expect(await screen.findByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      const img = screen.getByAltText(item.name);
      expect(img).toHaveAttribute("src", `http://localhost:5000${item.imageUrl}`);
      expect(img).toHaveAttribute("loading", "lazy");
    }
  });

  it("calls setCount with total cart items", async () => {
    const setCountMock = vi.fn();
    const cart = { Burger: 2, Pizza: 1 };

    renderWithProviders(<FoodCard setCart={vi.fn()} setCount={setCountMock} />, {
      preloadedState: {
        menu: { entrees: mockMenu.entrees, loading: false, error: null },
        cart,
      },
    });

    await waitFor(() => {
      expect(setCountMock).toHaveBeenCalledWith(3);
    });
  });

  it("navigates to /options with correct state when clicking Add to Cart", async () => {
    renderWithProviders(<FoodCard setCart={vi.fn()} setCount={vi.fn()} />, {
      preloadedState: {
        menu: { entrees: mockMenu.entrees, loading: false, error: null },
        cart: {},
      },
    });

    const buttons = await screen.findAllByRole("button", { name: /add .* to cart/i });

    buttons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith("/options", {
        state: { item: mockMenu.entrees[index], menu: mockMenu },
      });
    });
  });
});



