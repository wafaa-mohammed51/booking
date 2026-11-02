export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  phone_verified_at: string | null;
  created_at: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface LoginPayload {
  /** Phone login (preferred path — the app's native OTP flows use it). */
  phone?: string;
  /** Email login — the backend must accept either field on /auth/login. */
  email?: string;
  password: string;
}
export type LoginResponse = ApiResponse<AuthData>;

export interface SignUpPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}
export type SignUpResponse = ApiResponse<unknown>;

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}
export type VerifyOtpResponse = ApiResponse<unknown[]>;

export interface ResendOtpPayload {
  phone: string;
}
export type ResendOtpResponse = ApiResponse<unknown[]>;

export type VerifyResetOtpPayload = {
  phone: string;
  otp: string;
};

export type VerifyResetOtpResponse = ApiResponse<{ reset_token: string }>;

export type ForgetPasswordPayload = { phone: string };

export type ForgetPasswordResponse = {
  success: boolean;
  message: string;
  data: [];
};

export type ResetPasswordPayload = {
  phone: string;
  reset_token: string;
  password: string;
  password_confirmation: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
  data: [];
};

export type GoogleLoginPayload = { id_token: string };
export type GoogleLoginResponse = ApiResponse<AuthData>;
