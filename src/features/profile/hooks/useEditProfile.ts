import { QueryClient, useMutation } from "@tanstack/react-query";
import { editProfile } from "../services/editProfile";
import { toast } from "sonner";
import type {
  EditProfilePayload,
  EditProfileResponse,
  ValidationError,
} from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useEditProfile = () => {
  const queryClient = new QueryClient();
  const { logout } = useAuth();
  return useMutation<EditProfileResponse, ValidationError, EditProfilePayload>({
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
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
