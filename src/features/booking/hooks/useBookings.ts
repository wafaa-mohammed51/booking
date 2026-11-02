import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "@/features/booking/api/booking.api";

export const BOOKINGS_QUERY_KEY = ["bookings"] as const;

export const useBookings = () => {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: () => bookingApi.listBookings(),
    select: (res) => res.data,
  });
};
