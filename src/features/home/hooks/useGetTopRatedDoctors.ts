import { useQuery } from "@tanstack/react-query";
import { getTopRatedDoctors } from "../api/getTopRatedDoctors";

// Plain useQuery (not useSuspenseQuery) so a failed request surfaces as an
// `isError` flag the widget can handle locally, instead of throwing up to the
// router's error boundary and taking down the whole page.
export const useGetTopRatedDoctor = () =>
  useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRatedDoctors,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 10,
  });
