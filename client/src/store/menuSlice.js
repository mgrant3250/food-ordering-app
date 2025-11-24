import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenu } from "../api/menu";

export const loadMenu = createAsyncThunk("menu/loadMenu", async () => {
  const data = await fetchMenu();
  return data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    entrees: [],
    sides: [],
    drinks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMenu.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload); // entrees/sides/drinks
      })
      .addCase(loadMenu.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load menu";
      });
  },
});

export default menuSlice.reducer;
