Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Mock API
vi.mock("./api/auth", () => ({
  fetchLogin: vi.fn(),
}));

// Mock navigation
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Login Component (Redux)", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        token: null,
        loading: false,
        error: null,
      },
    });
    vi.clearAllMocks();
  });

  const renderWithStore = (ui) =>
    render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );

  it("renders login form fields", () => {
    renderWithStore(<Login />);

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("shows error when clicking login with empty fields", async () => {
    renderWithStore(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(
      await screen.findByText(/Please enter both email and password/i)
    ).toBeInTheDocument();
  });

  it("dispatches loginUser and navigates on success", async () => {
    const { fetchLogin } = require("./api/auth");

    fetchLogin.mockResolvedValue({
      success: true,
      token: "abc123",
      email: "test@example.com",
      role: "user",
    });

    renderWithStore(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      // Redux dispatched thunk
      const actions = store.getActions();
      expect(actions[0].type).toBe("auth/loginUser/pending");

      // API was called
      expect(fetchLogin).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    // Simulate store updating token
    store = mockStore({
      auth: {
        user: { email: "test@example.com", role: "user" },
        token: "abc123",
        loading: false,
        error: null,
      },
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows server error on failed login", async () => {
    const { fetchLogin } = require("./api/auth");

    fetchLogin.mockResolvedValue({
      success: false,
      message: "Invalid credentials",
    });

    renderWithStore(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/), {
      target: { value: "badpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    renderWithStore(<Login />);

    const passwordInput = screen.getByLabelText(/Password:/i);
    const toggleButton = screen.getByRole("button", { name: /show/i });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");
  });
});






