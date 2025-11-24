// Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

// Mock fetchLogin API
vi.mock("./api/auth", () => ({
  fetchLogin: vi.fn(),
}));

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Login Component", () => {
  const onLoginMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form fields", () => {
    render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("shows error if email and password are empty", async () => {
    render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/Please enter both email and password/i)).toBeInTheDocument();
  });

  it("calls fetchLogin and navigates on successful login", async () => {
    const { fetchLogin } = require("./api/auth");
    fetchLogin.mockResolvedValue({
      ok: true,
      success: true,
      token: "abc123",
      email: "test@example.com",
      role: "user",
    });

    render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(fetchLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(onLoginMock).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows error if login fails", async () => {
    const { fetchLogin } = require("./api/auth");
    fetchLogin.mockResolvedValue({
      ok: false,
      success: false,
      message: "Invalid credentials",
    });

    render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    expect(onLoginMock).not.toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Password:/i);
    const toggleButton = screen.getByRole("button", { name: /Show password/i });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");
    expect(toggleButton).toHaveAccessibleName("Hide password");
  });
});

