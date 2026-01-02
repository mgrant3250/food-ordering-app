import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin } from "../api/auth";
import { fetchForgotPassword } from "../api/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await fetchLogin(email, password);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await fetchForgotPassword(email);
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
    forgotPasswordMessage: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    clearForgotMessage(state) {
      state.forgotPasswordMessage = null;
    }
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
      })

        .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          state.forgotPasswordMessage = action.payload.message;
        } else {
          state.error = action.payload.message;
        }
      })

      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to send reset email";
      });
  },
});

export const { logout, clearForgotMessage } = authSlice.actions;
export default authSlice.reducer;