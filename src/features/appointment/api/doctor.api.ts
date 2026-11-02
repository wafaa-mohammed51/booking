import apiClient from "@/services/ApiClient";
import type {
  DoctorDetailsResponse,
  AvailableSlotsResponse,
} from "../types/appointment";

interface GetDoctorDetailsParams {
  doctorId: string;
  latitude?: number;
  longitude?: number;
}

interface GetAvailableSlotsParams {
  doctorId: string;
  /** "yyyy-MM-dd" */
  date: string;
}

export const doctorApi = {
  async getDoctorDetails({
    doctorId,
    latitude,
    longitude,
  }: GetDoctorDetailsParams): Promise<DoctorDetailsResponse> {
    return apiClient.get<DoctorDetailsResponse>(`/doctor/${doctorId}`, {
      latitude,
      longitude,
    });
  },

  async getAvailableSlots({
    doctorId,
    date,
  }: GetAvailableSlotsParams): Promise<AvailableSlotsResponse> {
    // Note the plural `/doctors/` path for this endpoint.
    return apiClient.get<AvailableSlotsResponse>(
      `/doctors/${doctorId}/available-slots`,
      { date },
    );
  },
};
