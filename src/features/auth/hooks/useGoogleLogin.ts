import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { GoogleLoginPayload } from "@/features/auth/types/auth";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => authApi.googleLogin(payload),
    onSuccess: (res) => {
      // Don't half-log-in: without a real token every protected request 500s

      const token = res?.data?.token;
      const user = res?.data?.user;
      if (!token || !user) {
        // TEMP: reveals the real response shape so we can handle it properly.
        console.log("google-login response:", JSON.stringify(res, null, 2));
        toast.error(
          "Google sign-in didn't return a session. Please try again.",
        );
        return;
      }

      login(token, user, true);
      toast.success(res.message);
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(
        getApiErrorMessage(error, "Could not sign you in with Google."),
      ),
  });
};
