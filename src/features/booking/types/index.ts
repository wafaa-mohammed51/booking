// ──────────────────────────────────────────────
// Booking domain types – mirrors the real API
// ──────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

/** UI filter tabs include "all" on top of the API statuses */
export type BookingFilterTab = "all" | BookingStatus;

export interface BookingPatient {
  id: number;
  name: string;
}

export interface BookingDoctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  image: string;
  address: string;
}

export interface Booking {
  id: number;
  booking_number: string;
  appointment_date: string; // ISO "2026-07-20T00:00:00.000000Z"
  appointment_time: string; // ISO "2026-07-15T09:00:00.000000Z"
  consultation_type: string;
  price: string;
  status: BookingStatus;
  payment_status: string;
  patient: BookingPatient;
  doctor: BookingDoctor;
}

/** Generic API envelope used by the bookings endpoints */
export interface BookingApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export type BookingListResponse = BookingApiResponse<Booking[]>;
export type BookingDetailResponse = BookingApiResponse<Booking>;

export interface ReschedulePayload {
  appointment_date: string; // "YYYY-MM-DD"
  appointment_time: string; // "HH:MM AM/PM"
}

export interface CreateBookingPayload {
  doctor_id: number;
  appointment_date: string; // "YYYY-MM-DD"
  appointment_time: string; // "HH:MM AM/PM"
  consultation_type: string; // e.g. "clinic"
}
