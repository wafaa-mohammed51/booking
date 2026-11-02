import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookingApi } from "@/features/booking/api/booking.api";
import { BOOKINGS_QUERY_KEY } from "./useBookings";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) => bookingApi.cancelBooking(bookingId),
    onSuccess: (res) => {
      toast.success(res.message || "Booking cancelled successfully.");
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to cancel booking."));
    },
  });
};
