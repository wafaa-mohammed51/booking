/** Base API URL read from the VITE_API_URL environment variable */
export const API_URL = import.meta.env.VITE_API_URL as string;

/** Booking-related endpoint paths */
export const BOOKING_ENDPOINTS = {
  LIST: "/bookings",
  CREATE: "/bookings",
  DETAIL: (id: number) => `/bookings/${id}`,
  CANCEL: (id: number) => `/bookings/${id}/cancel`,
  RESCHEDULE: (id: number) => `/bookings/${id}/reschedule`,
} as const;

/** Message-related endpoint paths */
export const MESSAGES_ENDPOINTS = {
  SEND: "/messages",
} as const;
