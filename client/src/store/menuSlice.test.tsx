import menuReducer, { loadMenu } from "./menuSlice";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as menuApi from "../api/menu";
import type { MenuState, MenuItem } from "../types/menu";
import type { AnyAction } from "@reduxjs/toolkit";


describe("menuSlice reducer", () => {
  const initialState: MenuState = {
    entrees: [],
    sides: [],
    drinks: [],
    sauces: [],
    loading: false,
    error: null,
  };

  const sampleMenu: MenuState = {
  entrees: [
    {
      _id: "1",
      name: "Burger",
      description: "Beef burger",
      price: 10,
      type: "entree",
      imageUrl: "/burger.jpg",
    },
  ],
  sides: [
    {
      _id: "2",
      name: "Fries",
      description: "French fries",
      price: 5,
      type: "side",
      imageUrl: "/fries.jpg",
    },
  ],
  drinks: [
    {
      _id: "3",
      name: "Soda",
      description: "Soft drink",
      price: 2,
      type: "drink",
      imageUrl: "/soda.jpg",
    },
  ],
  sauces: [],
  loading: false,
  error: null,
};

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the initial state", () => {
    expect(menuReducer(undefined, { type: "" } as AnyAction)).toEqual(
      initialState
    );
  });

  it("should handle loadMenu.pending", () => {
    const action = loadMenu.pending("requestId");

    const state = menuReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("should handle loadMenu.fulfilled", () => {
    const action = loadMenu.fulfilled(
      sampleMenu,
      "requestId"
    );

    const state = menuReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.entrees).toEqual(sampleMenu.entrees);
    expect(state.sides).toEqual(sampleMenu.sides);
    expect(state.drinks).toEqual(sampleMenu.drinks);
  });

  it("should handle loadMenu.rejected", () => {
    const action = loadMenu.rejected(
      new Error("Failed to load menu"),
      "requestId"
    );

    const state = menuReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to load menu");
  });

  it("should work with the actual async thunk", async () => {
    vi.spyOn(menuApi, "fetchMenu").mockResolvedValue(sampleMenu);

    const thunk = loadMenu();

    const dispatch = vi.fn();
    const getState = vi.fn();

    await thunk(dispatch, getState, undefined);

    const actions = dispatch.mock.calls.map(
      (call) => call[0].type
    );

    expect(actions).toContain(loadMenu.pending.type);
    expect(actions).toContain(loadMenu.fulfilled.type);
  });
});