import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { contactUsApi } from "@/features/contactUs/api/contactUs.api";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { SendMessagePayload } from "@/features/contactUs/types";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      contactUsApi.sendMessage(payload),
    onSuccess: (res) => {
      toast.success(res.message || "Message sent successfully!");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to send message."));
    },
  });
};
