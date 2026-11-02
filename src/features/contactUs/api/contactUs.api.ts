import apiClient from "@/services/ApiClient";
import { MESSAGES_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  SendMessagePayload,
  SendMessageResponse,
} from "@/features/contactUs/types";

export const contactUsApi = {
  /** POST /messages – send a contact-us message */
  async sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
    return apiClient.post<SendMessageResponse>(
      MESSAGES_ENDPOINTS.SEND,
      payload,
    );
  },
};
