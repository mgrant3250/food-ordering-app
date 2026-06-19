import { API_ENDPOINTS } from "./endpoints";
import { fetchJSON } from "./fetchJSON";

import type {
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "../types/auth";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const fetchLogin = (
  email: string,
  password: string
): Promise<LoginResponse> =>
  fetchJSON<LoginResponse>(API_ENDPOINTS.login, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ email, password }),
  });

export const fetchRegister = (
  email: string,
  password: string
): Promise<RegisterResponse> =>
  fetchJSON<RegisterResponse>(API_ENDPOINTS.register, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ email, password }),
  });

export const fetchForgotPassword = (
  email: string
): Promise<ForgotPasswordResponse> =>
  fetchJSON<ForgotPasswordResponse>(API_ENDPOINTS.forgotPassword, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ email }),
  });

export const resetPassword = (
  token: string,
  password: string
): Promise<ResetPasswordResponse> =>
  fetchJSON<ResetPasswordResponse>(API_ENDPOINTS.resetPassword, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ token, password }),
  });