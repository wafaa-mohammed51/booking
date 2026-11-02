import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { ForgetPasswordPayload } from "@/features/auth/types/auth";

const useForgetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ phone }: ForgetPasswordPayload) =>
      authApi.forgetPassword({ phone }),
    onSuccess: (res, variables) => {
      toast.success(res.message);
      // OTP was sent; go verify it to obtain the reset_token.
      navigate("/verify-reset-otp", {
        replace: true,
        state: { phone: variables.phone },
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not reset your password")),
  });
};

export default useForgetPassword;
