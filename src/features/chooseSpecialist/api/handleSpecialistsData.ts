import axiosInstance from "@/services/AxiosConfig";

/**
 * A specialist item as returned by GET /specialists.
 * The backend may send extra/optional fields, so only rely on what we render.
 */
export interface Specialist {
  id: number;
  name?: string;
  image?: string;
  /** specialty can be a plain string or an object with a `name`. */
  specialty?: string | { name?: string } | null;
  hospital?: string;
  address?: string;
  rating?: number | { average?: number } | null;
  consultation_price?: number;
  price?: number;
}

/** Resolve the specialty text out of either shape (string or object). */
export function getSpecialtyName(
  specialty?: string | { name?: string } | null,
): string | undefined {
  if (!specialty) return undefined;
  if (typeof specialty === "string") return specialty;
  return specialty.name;
}

/** Resolve the rating number out of either shape (number or { average }). */
export function getRatingValue(
  rating?: number | { average?: number } | null,
): number | undefined {
  if (typeof rating === "number") return rating;
  return rating?.average;
}

export async function getAllSpecialists(): Promise<Specialist[]> {
  const response = await axiosInstance.get("/specialists");
  // The endpoint wraps the list in `data`. Guard the shape so a 200 with a
  // missing/renamed field resolves to an empty list instead of crashing the
  // page (the page shows an honest "no data" message in that case).
  return response.data?.data ?? [];
}
