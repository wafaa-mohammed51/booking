import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookingApi } from "@/features/booking/api/booking.api";
import { BOOKINGS_QUERY_KEY } from "./useBookings";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import type { CreateBookingPayload } from "@/features/booking/types";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingApi.createBooking(payload),
    onSuccess: (res) => {
      toast.success(res.message || "Booking created successfully.");
      queryClient.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create booking."));
    },
  });
};
