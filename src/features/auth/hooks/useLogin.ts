import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import { toLoginPayload } from "@/features/auth/utils/identifier";
import type { LoginPayload } from "@/features/auth/types/auth";

type LoginVariables = { identifier: string } & LoginPayload & {
  remember: boolean;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    // `toLoginPayload` routes the identifier to its auth method:
    // email → { email, password }, phone → { phone: "+<dial><digits>", password }.
    mutationFn: ({ identifier, password }: LoginVariables) =>
      authApi.login(toLoginPayload(identifier, password)),
    onSuccess: (res, variables) => {
      login(res.data.token, res.data.user, variables.remember);
      toast.success(res.message);
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Could not sign you in.")),
  });
};
