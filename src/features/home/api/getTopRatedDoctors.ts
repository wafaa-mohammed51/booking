import axiosInstance from "@/services/AxiosConfig";
export type TopRatedDoctors = {
  id: number;
  name: string;
  image: string;
  /** specialty is usually a plain string; tolerate { name } as well. */
  specialty: string | { name?: string };
  rating: number | { average?: number };
  ratings_count: number;
  consultation_price: number;
  /** Some API builds expose the price as `price` instead. */
  price?: number;
  hospital: string;
  address: string;
  latitude: number;
  longitude: number;
};

export async function getTopRatedDoctors(): Promise<TopRatedDoctors[]> {
  // Let request/network errors throw so React Query can expose them via
  // `isError`. Guard the response shape so a 200 with a missing field still
  // resolves to a usable array instead of `undefined`.
  const res = await axiosInstance.get("/home");
  const payload = res.data?.data ?? res.data ?? {};
  const doctors = payload.top_rated_doctors ?? payload.doctors;
  return Array.isArray(doctors) ? doctors : [];
}
