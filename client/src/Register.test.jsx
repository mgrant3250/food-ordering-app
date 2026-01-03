// Register.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// -------------------
// MOCKS
// -------------------

// Mock endpoints before auth import
vi.mock("./api/endpoints", () => ({
  API_ENDPOINTS: {
    register: "/fake-register",
  },
}));

// Mock auth API AFTER endpoints is mocked
vi.mock("./api/auth", () => ({
  fetchRegister: vi.fn(() => Promise.resolve({ ok: true })),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// -------------------
// Import component AFTER mocks
// -------------------
import Register from "./Register";
import { fetchRegister } from "./api/auth";

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper function to fill form
  const fillForm = (email, password, confirmPassword) => {
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: password },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: confirmPassword },
    });
  };

  it("renders the form fields", () => {
    render(<Register />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    fetchRegister.mockResolvedValue({ ok: true });

    render(<Register />);
    fillForm("test@example.com", "Password123!", "Password123!");
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(fetchRegister).toHaveBeenCalledWith("test@example.com", "Password123!");
      expect(screen.getByText(/Account created successfully!/i)).toBeInTheDocument();
    });
  });

  it("shows error if API returns failure", async () => {
    fetchRegister.mockResolvedValue({ ok: false, message: "Email already used" });

    render(<Register />);
    fillForm("used@example.com", "Password123!", "Password123!");
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email already used/i)).toBeInTheDocument();
    });
  });

  it("toggles password visibility", () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmInput = screen.getByLabelText(/Confirm Password/i);
    const toggleButtons = screen.getAllByRole("button", { name: /show/i });

    // Password field
    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleButtons[0]);
    expect(passwordInput.type).toBe("text");

    // Confirm password field
    expect(confirmInput.type).toBe("password");
    fireEvent.click(toggleButtons[1]);
    expect(confirmInput.type).toBe("text");
  });
});
