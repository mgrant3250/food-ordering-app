import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FoodCard from "./FoodCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // prevents automatic retries in tests
    },
  });

    return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


vi.mock("../utils/cartUtils", () => ({
  getTotalItemCount: (cart) => Object.values(cart).reduce((a, b) => a + b, 0),
}));


const mockMenu = {
  entrees: [
    { name: "Burger", price: 10, description: "Tasty burger", imageUrl: "/burger.jpg" },
    { name: "Pizza", price: 12, description: "Cheesy pizza", imageUrl: "/pizza.jpg" },
  ],
};

describe("FoodCard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", () => {
    vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {})); // never resolves
    render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, { wrapper: createWrapper() });
    expect(screen.getByText("Loading menu...")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
  vi.spyOn(global, "fetch").mockImplementationOnce(() => {
    return Promise.resolve({
      ok: false, 
      json: async () => ({}),
    });
  });

  render(
    <FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />,
    { wrapper: createWrapper() }
  );

  await waitFor(() => {
    expect(screen.getByText("Error loading menu.")).toBeInTheDocument();
  });
});


  it("renders menu items correctly", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockMenu,
    });

    render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, { wrapper: createWrapper() });

    // Check that each item is rendered
    for (const item of mockMenu.entrees) {
      expect(await screen.findByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      // Check lazy loading
       const img = screen.getByAltText(item.name);
       expect(img).toHaveAttribute("src", `http://localhost:5000${item.imageUrl}`);
       expect(img).toHaveAttribute("loading", "lazy");
    }
  });

  it("calls setCount with total cart items", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockMenu,
    });

    const setCountMock = vi.fn();
    const cart = { Burger: 2, Pizza: 1 };

    render(<FoodCard cart={cart} setCart={vi.fn()} setCount={setCountMock} />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(setCountMock).toHaveBeenCalledWith(3);
    });
  });

it("navigates to /options with correct state when clicking Add to Cart", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => mockMenu,
  });

  render(<FoodCard cart={{}} setCart={vi.fn()} setCount={vi.fn()} />, {
    wrapper: createWrapper(),
  });

  const buttons = await screen.findAllByRole("button", { name: /add .* to cart/i });

  // click each Add to Cart button
  buttons.forEach((button, index) => {
    button.click();
    expect(mockNavigate).toHaveBeenCalledWith("/options", {
      state: {
        item: mockMenu.entrees[index],
        menu: mockMenu,
      },
    });
  });
});
});
