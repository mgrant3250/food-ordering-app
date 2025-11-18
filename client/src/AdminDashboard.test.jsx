
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminDashboard from "./AdminDashboard";


vi.mock("./components/AdminMenu", () => ({
  default: () => <div data-testid="admin-menu">AdminMenu Component</div>,
}));
vi.mock("./components/AdminOrders", () => ({
  default: () => <div data-testid="admin-orders">AdminOrders Component</div>,
}));
vi.mock("./components/AdminUsers", () => ({
  default: () => <div data-testid="admin-users">AdminUsers Component</div>,
}));

describe("AdminDashboard", () => {
  it("renders all tab buttons", () => {
    render(<AdminDashboard />);

    expect(screen.getByText("Menu Items")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders AdminMenu by default", () => {
    render(<AdminDashboard />);
    expect(screen.getByTestId("admin-menu")).toBeInTheDocument();
  });

  it("switches to Orders tab when clicked", () => {
    render(<AdminDashboard />);
    
    const ordersButton = screen.getByText("Orders");
    fireEvent.click(ordersButton);

    expect(screen.getByTestId("admin-orders")).toBeInTheDocument();
    expect(screen.queryByTestId("admin-menu")).not.toBeInTheDocument();
  });

  it("switches to Users tab when clicked", () => {
    render(<AdminDashboard />);
    
    const usersButton = screen.getByText("Users");
    fireEvent.click(usersButton);

    expect(screen.getByTestId("admin-users")).toBeInTheDocument();
    expect(screen.queryByTestId("admin-menu")).not.toBeInTheDocument();
    expect(screen.queryByTestId("admin-orders")).not.toBeInTheDocument();
  });

  it("applies 'active' class to the selected tab", () => {
    render(<AdminDashboard />);
    
    const menuButton = screen.getByText("Menu Items");
    const ordersButton = screen.getByText("Orders");

    
    expect(menuButton).toHaveClass("active");
    expect(ordersButton).not.toHaveClass("active");

    fireEvent.click(ordersButton);
    expect(ordersButton).toHaveClass("active");
    expect(menuButton).not.toHaveClass("active");
  });
});