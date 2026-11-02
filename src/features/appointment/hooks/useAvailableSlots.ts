import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { doctorApi } from "@/features/appointment/api/doctor.api";

export const useAvailableSlots = (doctorId?: string, date?: Date) => {
  const dateKey = date ? format(date, "yyyy-MM-dd") : undefined;

  return useQuery({
    queryKey: ["available-slots", doctorId, dateKey],
    queryFn: () =>
      doctorApi.getAvailableSlots({ doctorId: doctorId!, date: dateKey! }),
    enabled: Boolean(doctorId && dateKey),
  });
};
