import reducer, {
  logout,
  clearForgotMessage,
  loginUser,
  forgotPassword,
} from "./authSlice";

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AuthState } from "../types/auth";
import type { AnyAction } from "@reduxjs/toolkit";


// --------------------
// Tests
// --------------------
describe("authSlice", () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      user: null,
      token: null,
      loading: false,
      error: null,
      forgotPasswordMessage: null,
    };

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {});
  });

  it("should handle initial state", () => {
    const expected: AuthState = {
      user: JSON.parse(localStorage.getItem("user") || "null"),
      token: localStorage.getItem("token"),
      loading: false,
      error: null,
      forgotPasswordMessage: null,
    };

    expect(reducer(undefined, { type: "unknown" } as AnyAction)).toEqual(
      expected
    );
  });

  it("should handle logout", () => {
    const state: AuthState = {
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
    const state: AuthState = {
      ...initialState,
      forgotPasswordMessage: "Sent",
    };

    const nextState = reducer(state, clearForgotMessage());

    expect(nextState.forgotPasswordMessage).toBeNull();
  });

  it("should handle loginUser.pending", () => {
    const action = { type: loginUser.pending.type } as AnyAction;

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

    const action = {
      type: loginUser.fulfilled.type,
      payload,
    } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual({
      email: "test@test.com",
      role: "user",
    });
    expect(nextState.token).toBe("123");
  });

  it("should handle loginUser.fulfilled with failure", () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        success: false,
        message: "Invalid credentials",
      },
    } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Invalid credentials");
  });

  it("should handle loginUser.rejected", () => {
    const action = { type: loginUser.rejected.type } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Server error");
  });

  it("should handle forgotPassword.fulfilled with success", () => {
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: {
        success: true,
        message: "Reset email sent",
      },
    } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.forgotPasswordMessage).toBe("Reset email sent");
  });

  it("should handle forgotPassword.fulfilled with failure", () => {
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: {
        success: false,
        message: "Email not found",
      },
    } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Email not found");
  });

  it("should handle forgotPassword.rejected", () => {
    const action = {
      type: forgotPassword.rejected.type,
    } as AnyAction;

    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Failed to send reset email");
  });
});