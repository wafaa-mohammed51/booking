import axios from "axios";
import axiosInstance from "@/services/AxiosConfig";
import type { EditProfilePayload } from "../types";

export async function editProfile(data: EditProfilePayload) {
  try {
    const res = await axiosInstance.put(`/profile`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      throw error.response || "An error occurred";
    }
  }
}
