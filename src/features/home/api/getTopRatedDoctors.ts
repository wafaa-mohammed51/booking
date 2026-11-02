import axiosInstance from "@/services/AxiosConfig";

export type TopRatedDoctors = {
  id: number;
  name: string;
  image: string;
  specialty: string | { name?: string };
  rating: number | { average?: number };
  ratings_count: number;
  consultation_price: number;
  price?: number;
  hospital: string;
  address: string;
  latitude: number;
  longitude: number;
};

export async function getTopRatedDoctors(): Promise<TopRatedDoctors[]> {
  const res = await axiosInstance.get("/home");
  const body = res.data;
  const payload = body?.data ?? body;
  const doctors = payload?.top_rated_doctors ?? payload?.doctors ?? body?.top_rated_doctors ?? body?.doctors;
  if (!Array.isArray(doctors)) {
    throw new Error("The server returned an invalid doctors list. Please try again or contact support.");
  }
  if (doctors.some((doctor) => !doctor || typeof doctor !== "object" || !Number.isSafeInteger(doctor.id) || doctor.id <= 0)) {
    throw new Error("The server returned an invalid doctor record. Please try again or contact support.");
  }
  return doctors as TopRatedDoctors[];
}
