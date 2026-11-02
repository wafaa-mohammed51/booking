import { QueryClient, useMutation } from "@tanstack/react-query";

import { editPassword } from "../services/editPassword";
import { toast } from "sonner";
import type { PasswordResponse, PasswordValError } from "../types";
import type { ChangePasswordType } from "../schemas/changePasswordSchema";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useEditPassword = () => {
  const queryClient = new QueryClient();
  const { logout } = useAuth();
  return useMutation<PasswordResponse, PasswordValError, ChangePasswordType>({
    mutationFn: editPassword,
    onSuccess: () => {
      toast.success("Password Change successfully.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      if ("status" in error && error.status === 401) {
        toast.error("Session Expired please login.");
        logout();
        window.location.href = "/sign-in";
      }
    },
  });
};
