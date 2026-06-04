import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchLogin, fetchForgotPassword } from "../api/auth"

/* -------------------- Types -------------------- */

type User = {
  email: string
  role: string
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  forgotPasswordMessage: string | null
}

type LoginArgs = {
  email: string
  password: string
}

/* -------------------- Helpers -------------------- */

const getStoredUser = (): User | null => {
  try {
    const data = localStorage.getItem("user")
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

/* -------------------- Async Thunks -------------------- */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginArgs) => {
    return await fetchLogin(email, password)
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    return await fetchForgotPassword(email)
  }
)

/* -------------------- Initial State -------------------- */

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem("token"), // ✅ string | null is correct
  loading: false,
  error: null,
  forgotPasswordMessage: null,
}

/* -------------------- Slice -------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null

      localStorage.removeItem("user")
      localStorage.removeItem("token")
    },

    clearForgotMessage(state) {
      state.forgotPasswordMessage = null
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- LOGIN -------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false

          if (action.payload.success) {
            state.user = {
              email: action.payload.email,
              role: action.payload.role,
            }

            state.token = action.payload.token

            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("token", action.payload.token ?? "")
          } else {
            state.error = action.payload.message
          }
        }
      )

      .addCase(loginUser.rejected, (state) => {
        state.loading = false
        state.error = "Server error"
      })

      /* -------- FORGOT PASSWORD -------- */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.forgotPasswordMessage = null
      })

      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false

          if (action.payload.success) {
            state.forgotPasswordMessage = action.payload.message
          } else {
            state.error = action.payload.message
          }
        }
      )

      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false
        state.error = "Failed to send reset email"
      })
  },
})

export const { logout, clearForgotMessage } = authSlice.actions
export default authSlice.reducer