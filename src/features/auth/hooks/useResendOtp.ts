import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { ResendOtpPayload } from "@/features/auth/types/auth";

export const useResendOtp = () =>
  useMutation({
    mutationFn: (payload: ResendOtpPayload) => authApi.resendOtp(payload),
    onSuccess: (res) => toast.success(res.message),
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not resend the code.")),
  });
