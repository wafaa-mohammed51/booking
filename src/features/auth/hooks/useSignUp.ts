import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { SignUpPayload } from "@/features/auth/types/auth";

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => authApi.signUp(payload),
    onSuccess: (res, variables) => {
      toast.success(res.message);
      // Account created but the phone isn't verified yet — carry it to the OTP page.
      navigate("/otp-verify", { state: { phone: variables.phone } });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not create your account.")),
  });
};
