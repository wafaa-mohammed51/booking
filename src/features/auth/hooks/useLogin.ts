import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import { toLoginPayload } from "@/features/auth/utils/identifier";
import type { LoginPayload } from "@/features/auth/types/auth";

type LoginVariables = { identifier: string } & LoginPayload & { remember: boolean };

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  return useMutation({
    mutationFn: ({ identifier, password }: LoginVariables) => authApi.login(toLoginPayload(identifier, password)),
    onSuccess: (res, variables) => {
      if (!res?.data?.token || !res.data.user || res.success === false) {
        toast.error("Sign-in didn't return a valid session. Please try again.");
        return;
      }
      login(res.data.token, res.data.user, variables.remember);
      toast.success(res.message);
      const from = (location.state as { from?: { pathname?: unknown; search?: unknown; hash?: unknown } } | null)?.from;
      const pathname = typeof from?.pathname === "string" && from.pathname.startsWith("/") && !from.pathname.startsWith("//") && !from.pathname.includes("\\") ? from.pathname : "/";
      const search = typeof from?.search === "string" && from.search.startsWith("?") ? from.search : "";
      const hash = typeof from?.hash === "string" && from.hash.startsWith("#") ? from.hash : "";
      navigate({ pathname, search, hash }, { replace: true });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Could not sign you in.")),
  });
};
