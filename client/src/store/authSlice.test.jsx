// authSlice.test.jsx
import reducer, { logout, clearForgotMessage, loginUser, forgotPassword } from './authSlice';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe("authSlice", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      user: null,
      token: null,
      loading: false,
      error: null,
      forgotPasswordMessage: null,
    };

    // Clear mocks for localStorage
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
      loading: false,
      error: null,
      forgotPasswordMessage: null,
    });
  });

  it("should handle logout", () => {
    const state = {
      ...initialState,
      user: { email: "test@test.com", role: "user" },
      token: "123",
    };
    const nextState = reducer(state, logout());
    expect(nextState.user).toBeNull();
    expect(nextState.token).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });

  it("should handle clearForgotMessage", () => {
    const state = { ...initialState, forgotPasswordMessage: "Sent" };
    const nextState = reducer(state, clearForgotMessage());
    expect(nextState.forgotPasswordMessage).toBeNull();
  });

  it("should handle loginUser.pending", () => {
    const action = { type: loginUser.pending.type };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it("should handle loginUser.fulfilled with success", () => {
    const payload = {
      success: true,
      email: "test@test.com",
      role: "user",
      token: "123",
    };
    const action = { type: loginUser.fulfilled.type, payload };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual({ email: "test@test.com", role: "user" });
    expect(nextState.token).toBe("123");
  });

  it("should handle loginUser.fulfilled with failure", () => {
    const payload = { success: false, message: "Invalid credentials" };
    const action = { type: loginUser.fulfilled.type, payload };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Invalid credentials");
  });

  it("should handle loginUser.rejected", () => {
    const action = { type: loginUser.rejected.type };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Server error");
  });

  it("should handle forgotPassword.fulfilled with success", () => {
    const payload = { success: true, message: "Reset email sent" };
    const action = { type: forgotPassword.fulfilled.type, payload };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.forgotPasswordMessage).toBe("Reset email sent");
  });

  it("should handle forgotPassword.fulfilled with failure", () => {
    const payload = { success: false, message: "Email not found" };
    const action = { type: forgotPassword.fulfilled.type, payload };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Email not found");
  });

  it("should handle forgotPassword.rejected", () => {
    const action = { type: forgotPassword.rejected.type };
    const nextState = reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Failed to send reset email");
  });
});
