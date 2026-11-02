import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { GoogleLoginPayload } from "@/features/auth/types/auth";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => authApi.googleLogin(payload),
    onSuccess: (res) => {
      const token = res?.data?.token;
      const user = res?.data?.user;
      if (!token || !user || res.success === false) {
        toast.error("Google sign-in didn't return a session. Please try again.");
        return;
      }
      login(token, user, true);
      toast.success(res.message);
      const from = (location.state as { from?: { pathname?: unknown; search?: unknown; hash?: unknown } } | null)?.from;
      const pathname = typeof from?.pathname === "string" && from.pathname.startsWith("/") && !from.pathname.startsWith("//") && !from.pathname.includes("\\") ? from.pathname : "/";
      const search = typeof from?.search === "string" && from.search.startsWith("?") ? from.search : "";
      const hash = typeof from?.hash === "string" && from.hash.startsWith("#") ? from.hash : "";
      navigate({ pathname, search, hash }, { replace: true });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Could not sign you in with Google.")),
  });
};
