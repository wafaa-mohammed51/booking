import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "@/features/appointment/api/doctor.api";

export const doctorKeys = {
  all: ["doctor"] as const,
  detail: (id: string) => [...doctorKeys.all, "detail", id] as const,
};

interface Coords {
  latitude: number;
  longitude: number;
}

export const useDoctorDetails = (doctorId?: string, coords?: Coords) =>
  useQuery({
    queryKey: doctorKeys.detail(doctorId ?? ""),
    queryFn: () =>
      doctorApi.getDoctorDetails({
        doctorId: doctorId!,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      }),
    enabled: Boolean(doctorId),
  });
