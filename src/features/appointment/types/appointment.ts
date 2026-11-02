// ============================================================================
// UI view-model types — what the components render (mapped from the API below).
// ============================================================================

export interface Review {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  rating: number;
  text: string;
}

export interface DoctorStat {
  /** lucide icon name is chosen in the component; this is just the data. */
  label: string;
  value: string;
}

export interface DoctorLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  verified: boolean;
  about: string;
  patients: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  location: DoctorLocation;
}

/** A single selectable day in the calendar strip. */
export interface DaySlot {
  weekday: string; // "Fri"
  day: number; // 12
  /** ISO-ish key used to identify the selected day. */
  key: string;
}

/** A bookable time within a day. */
export interface TimeSlot {
  label: string; // "11:00 AM"
  available: boolean;
}

// ============================================================================
// API response types — the raw shapes returned by the backend.
// ============================================================================

export interface Specialty {
  id: number;
  name: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: number;
}

export interface Patient {
  id: number;
  name: string;
}

/** A rating/review as returned by the API (distinct from the UI `Review`). */
export interface DoctorReview {
  id: number;
  rating: number;
  comment: string;
  date: string;
  patient: Patient;
  doctor_id: number;
  booking_id: number;
}

export interface RatingSummary {
  average: number;
  count: number;
}

/** Weekday abbreviation → list of available "HH:mm" times. */
export type OpeningHours = Partial<
  Record<"sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri", string[]>
>;

/** Location as returned by the API (note: `latitude`/`longitude`, not lat/lng). */
export interface ApiDoctorLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface DoctorDetails {
  id: number;
  name: string;
  image: string;
  gender: string;
  specialty: Specialty;
  about: string;
  experience_years: number;
  education: Education[];
  certificates: Certificate[];
  languages: string[];
  consultation_price: number;
  rating: RatingSummary;
  reviews: DoctorReview[];
  opening_hours: OpeningHours;
  available_slots: string[];
  address: string;
  location: ApiDoctorLocation;
  distance_km: number;
  is_favorite: boolean;
}

export interface DoctorDetailsResponse {
  success: boolean;
  message: string;
  data: DoctorDetails;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface DoctorRatingsResponse {
  status: boolean;
  message: string;
  data: {
    ratings: DoctorReview[];
    pagination: Pagination;
  };
}

export interface RatingPayload {
  booking_id: string;
  doctor_id: string;
  rating: number;
  comment: string;
}

export interface RatingCreateResponse {
  success: boolean;
  message: string;
  data: DoctorReview;
}

/** GET /doctors/{id}/available-slots?date=… — data is a list of "hh:mm AM/PM". */
export interface AvailableSlotsResponse {
  status: boolean;
  message: string;
  data: string[];
}
