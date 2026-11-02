import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfile } from "../services/getUser";

export const useGetProfile = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return { data, isLoading, error };
};
