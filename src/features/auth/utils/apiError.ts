import axios from "axios";

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Human-readable reason when a request failed *before* the server answered
 * (missing configuration, offline, DNS failure, CORS…) — as opposed to a real
 * HTTP error, whose message comes from the response body instead.
 * Returns `null` when the error is NOT a connection/config problem.
 */
export function getRequestFailureReason(error: unknown): string | null {
  if (axios.isAxiosError(error)) {
    // A network/transport failure (timeout, offline, unknown host…)
    if (!error.response) {
      return "The server could not be reached. Please check your connection and try again.";
    }
    return null;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return null;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback;

  if (!error.response) {
    return "Can't reach the server right now. Please check your internet connection and try again.";
  }

  const body = error.response.data as ApiErrorBody | undefined;
  const firstFieldError = Object.values(body?.errors ?? {})[0]?.[0];

  return firstFieldError ?? body?.message ?? fallback;
}
