import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./Login";

// --------------------
// Mocks
// --------------------
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children }) => <span>{children}</span>,
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "./store/authSlice";

// --------------------
// Tests
// --------------------
describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithState = (authState) => {
    useSelector.mockImplementation((selector) =>
      selector({ auth: authState })
    );
    render(<Login />);
  };

  it("renders login form fields", () => {
    renderWithState({ loading: false, error: null, token: null });

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    renderWithState({ loading: false, error: null, token: null });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(toast.error).toHaveBeenCalledWith(
      "Please enter both email and password"
    );
  });

it("dispatches loginUser when valid form is submitted", () => {
  renderWithState({ loading: false, error: null, token: null });

  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "test@example.com" },
  });

  fireEvent.change(screen.getByLabelText(/Password:/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

  expect(mockDispatch).toHaveBeenCalledTimes(1);

  const dispatchedArg = mockDispatch.mock.calls[0][0];

  expect(typeof dispatchedArg).toBe("function");
});



  it("toggles password visibility", () => {
    renderWithState({ loading: false, error: null, token: null });

    const passwordInput = screen.getByLabelText(/Password:/i);
    const toggleBtn = screen.getByRole("button", { name: /show/i });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe("text");
  });

  it("shows error from redux state", () => {
    renderWithState({
      loading: false,
      error: "Invalid credentials",
      token: null,
    });

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid credentials"
    );
  });

  it("shows success toast and redirects when token exists", () => {
    vi.useFakeTimers();

    renderWithState({
      loading: false,
      error: null,
      token: "fake-token",
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Login Successful",
      expect.any(Object)
    );

    vi.advanceTimersByTime(200);

    expect(mockNavigate).toHaveBeenCalledWith("/");

    vi.useRealTimers();
  });
});
