import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { ResetPasswordPayload } from "@/features/auth/types/auth";

const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      phone,
      reset_token,
      password,
      password_confirmation,
    }: ResetPasswordPayload) =>
      authApi.resetPassword({
        phone,
        reset_token,
        password,
        password_confirmation,
      }),
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/sign-in", { replace: true });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not reset your password.")),
  });
};

export default useResetPassword;
