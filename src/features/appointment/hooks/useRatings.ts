import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ratingApi } from "@/features/appointment/api/rating.api";
import { ratingKeys } from "@/features/appointment/hooks/ratingKeys";
import type { RatingPayload } from "@/features/appointment/types/appointment";

export const useDoctorRatings = (doctorId?: string, page = 1, perPage = 15) =>
  useQuery({
    queryKey: [...ratingKeys.lists(), doctorId, page, perPage],
    queryFn: () =>
      ratingApi.getDoctorRatings({ doctorId: doctorId!, page, perPage }),
    enabled: Boolean(doctorId),
  });

export const usePostRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RatingPayload) => ratingApi.postDoctorRating(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
};
