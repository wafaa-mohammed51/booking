import { type ChangePasswordType } from "./../schemas/changePasswordSchema";
import axios from "axios";

import axiosInstance from "@/services/AxiosConfig";

export async function editPassword(data: ChangePasswordType) {
  try {
    const res = await axiosInstance.post(`/auth/change-password`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response || "An error occurred";
    }
  }
}
