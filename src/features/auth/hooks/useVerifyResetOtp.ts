import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { VerifyResetOtpPayload } from "@/features/auth/types/auth";

export const useVerifyResetOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: VerifyResetOtpPayload) =>
      authApi.verifyResetOtp(payload),
    onSuccess: (res, variables) => {
      toast.success(res.message);
      // Carry the phone and the token the API just issued to the reset screen.
      navigate("/reset-password", {
        replace: true,
        state: {
          phone: variables.phone,
          reset_token: res.data.reset_token,
        },
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not verify the code.")),
  });
};
