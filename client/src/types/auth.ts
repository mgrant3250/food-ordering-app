import { UserRole, AuthUser } from "./user";

export type LoginResponse = {
  ok: boolean;
  success: boolean;
  message?: string;
  token?: string;
  email?: string;
  role?: UserRole;
};

export type RegisterResponse = {
  ok: boolean;
  success: boolean;
  message?: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type AuthState = {
  user: AuthUser | null
  token: string | null
  loading: boolean
  error: string | null
  forgotPasswordMessage: string | null
}

export type LoginArgs = {
  email: string
  password: string
}