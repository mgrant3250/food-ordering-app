import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchMenu } from "../api/menu"
import { MenuState } from "../types/menu"

const initialState: MenuState = {
  entrees: [],
  sides: [],
  drinks: [],
  sauces: [],
  loading: false,
  error: null,
}

export const loadMenu = createAsyncThunk<MenuState>(
  "menu/loadMenu",
  async () => {
    const data = await fetchMenu()
    return data as MenuState
  }
)

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMenu.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loadMenu.fulfilled,
        (state, action: PayloadAction<MenuState>) => {
          state.loading = false
          Object.assign(state, action.payload)
        }
      )
      .addCase(loadMenu.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to load menu"
      })
  },
})

export default menuSlice.reducer
