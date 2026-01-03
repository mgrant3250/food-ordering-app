import menuReducer, { loadMenu } from "./menuSlice";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as menuApi from "../api/menu";

describe("menuSlice reducer", () => {
  const initialState = {
    entrees: [],
    sides: [],
    drinks: [],
    loading: false,
    error: null,
  };

  const sampleMenu = {
    entrees: [{ name: "Burger", price: 10 }],
    sides: [{ name: "Fries", price: 5 }],
    drinks: [{ name: "Soda", price: 2 }],
  };

  beforeEach(() => {
    vi.restoreAllMocks(); // reset mocks before each test
  });

  it("should return the initial state", () => {
    expect(menuReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle loadMenu.pending", () => {
    const state = menuReducer(initialState, { type: loadMenu.pending.type });
    expect(state.loading).toBe(true);
  });

  it("should handle loadMenu.fulfilled", () => {
    const state = menuReducer(initialState, { type: loadMenu.fulfilled.type, payload: sampleMenu });
    expect(state.loading).toBe(false);
    expect(state.entrees).toEqual(sampleMenu.entrees);
    expect(state.sides).toEqual(sampleMenu.sides);
    expect(state.drinks).toEqual(sampleMenu.drinks);
  });

  it("should handle loadMenu.rejected", () => {
    const state = menuReducer(initialState, { type: loadMenu.rejected.type });
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to load menu");
  });

  it("should work with the actual async thunk", async () => {
    // Mock the API to return sample menu
    vi.spyOn(menuApi, "fetchMenu").mockResolvedValue(sampleMenu);

    const thunk = loadMenu();
    const dispatch = vi.fn();
    const getState = vi.fn();

    await thunk(dispatch, getState, undefined);

    const actions = dispatch.mock.calls.map(call => call[0].type);

    // should dispatch pending then fulfilled
    expect(actions).toContain(loadMenu.pending.type);
    expect(actions).toContain(loadMenu.fulfilled.type);
  });
});
