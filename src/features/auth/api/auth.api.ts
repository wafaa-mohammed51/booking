import type {
  ApiResponse,
  LoginPayload,
  LoginResponse,
  SignUpPayload,
  SignUpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  User,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  VerifyResetOtpPayload,
  VerifyResetOtpResponse,
  GoogleLoginPayload,
  GoogleLoginResponse,
} from "@/features/auth/types/auth";
import apiClient from "@/services/ApiClient";

export const authApi = {
  // return token
  async login(payload: LoginPayload): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>("/auth/login", payload);
  },

  //  Creates the account and sends otp
  async signUp(payload: SignUpPayload): Promise<SignUpResponse> {
    return apiClient.post<SignUpResponse>("/auth/register", payload);
  },

  /** Marks the phone verified. Returns no token — the user still has to log in. */
  async verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
    return apiClient.post<VerifyOtpResponse>("/auth/verify-otp", payload);
  },

  async resendOtp(payload: ResendOtpPayload): Promise<ResendOtpResponse> {
    return apiClient.post<ResendOtpResponse>("/auth/resend-otp", payload);
  },
  async forgetPassword(
    payload: ForgetPasswordPayload,
  ): Promise<ForgetPasswordResponse> {
    return apiClient.post<ForgetPasswordResponse>(
      "/auth/forgot-password",
      payload,
    );
  },
  async verifyResetOtp(
    payload: VerifyResetOtpPayload,
  ): Promise<VerifyResetOtpResponse> {
    return apiClient.post<VerifyResetOtpResponse>(
      "/auth/verify-reset-otp",
      payload,
    );
  },
  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> {
    return apiClient.post<ResetPasswordResponse>(
      "/auth/reset-password",
      payload,
    );
  },
  async googleLogin(payload: GoogleLoginPayload): Promise<GoogleLoginResponse> {
    return apiClient.post<GoogleLoginResponse>("/auth/google-login", payload);
  },

  //persistant login
  async getMe(): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>("/auth/me");
  },
};
