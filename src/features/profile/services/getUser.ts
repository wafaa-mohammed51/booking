import axios from "axios";

import axiosInstance from "@/services/AxiosConfig";
import type { UserProfile } from "../types";

export async function getProfile(): Promise<UserProfile> {
  try {
    const res = await axiosInstance.get(`/profile`);
    return res.data.data as UserProfile;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      throw error.response?.data || "An error occurred";
    }

    throw error;
  }
}
