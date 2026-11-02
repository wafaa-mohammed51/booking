import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import type { VerifyOtpPayload } from "@/features/auth/types/auth";

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
    onSuccess: (res, variables) => {
      toast.success(res.message);
      navigate("/sign-in", {
        replace: true,
        state: { phone: variables.phone },
      });
    },
  });
};
