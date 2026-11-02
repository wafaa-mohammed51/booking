import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookingApi } from "@/features/booking/api/booking.api";
import { BOOKINGS_QUERY_KEY } from "./useBookings";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { ReschedulePayload } from "@/features/booking/types";

interface RescheduleVariables {
  bookingId: number;
  payload: ReschedulePayload;
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, payload }: RescheduleVariables) =>
      bookingApi.rescheduleBooking(bookingId, payload),
    onSuccess: (res) => {
      toast.success(res.message || "Booking rescheduled successfully.");
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to reschedule booking."));
    },
  });
};
