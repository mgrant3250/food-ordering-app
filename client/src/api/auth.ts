import { API_ENDPOINTS } from "./endpoints";
import type { LoginResponse, RegisterResponse, ForgotPasswordResponse, ResetPasswordResponse } from "../types/auth";
import { fetchJSON } from "./fetchJSON";

/* -------------------- API Functions -------------------- */


export const fetchLogin = (
  email: string,
  password: string
): Promise<LoginResponse> =>
  fetchJSON<LoginResponse>(API_ENDPOINTS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  

export const fetchRegister = (
  email: string,
  password: string
): Promise<RegisterResponse> => 
  fetchJSON<RegisterResponse>(API_ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })



export const fetchForgotPassword = (
  email: string
): Promise<ForgotPasswordResponse> => 
  fetchJSON(API_ENDPOINTS.forgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })


export const resetPassword = (
  token: string,
  password: string
): Promise<ResetPasswordResponse> => 
  fetchJSON(API_ENDPOINTS.resetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      password,
    }),
  })