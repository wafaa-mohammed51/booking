import apiClient from "@/services/ApiClient";
import type {
  RatingPayload,
  DoctorRatingsResponse,
  RatingCreateResponse,
} from "../types/appointment";

interface GetDoctorRatingsParams {
  doctorId: string;
  page?: number;
  perPage?: number;
}

export const ratingApi = {
  async getDoctorRatings({
    doctorId,
    page = 1,
    perPage = 15,
  }: GetDoctorRatingsParams): Promise<DoctorRatingsResponse> {
    return apiClient.get<DoctorRatingsResponse>(`/doctor/${doctorId}/ratings`, {
      page,
      per_page: perPage,
    });
  },

  async postDoctorRating(
    data: RatingPayload,
  ): Promise<RatingCreateResponse> {
    return apiClient.post<RatingCreateResponse>("/ratings", data);
  },
};
