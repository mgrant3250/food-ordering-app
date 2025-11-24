import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin } from "../api/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await fetchLogin(email, password);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          state.user = {
            email: action.payload.email,
            role: action.payload.role,
          };
          state.token = action.payload.token;

          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("token", state.token);
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Server error";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;