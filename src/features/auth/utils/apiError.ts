import axios from "axios";

interface ApiErrorBody {
  message?: unknown;
  errors?: Record<string, unknown>;
}

export function getRequestFailureReason(error: unknown): string | null {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "The server could not be reached. Please check your connection and try again.";
    return null;
  }
  if (error instanceof Error) return error.message;
  return null;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message.trim() ? error.message : fallback;
  }
  if (!error.response) {
    return "Can't reach the server right now. Please check your internet connection and try again.";
  }
  const body = error.response.data as ApiErrorBody | undefined;
  const errors = body?.errors;
  if (errors && typeof errors === "object") {
    for (const value of Object.values(errors)) {
      if (typeof value === "string" && value.trim()) return value;
      if (Array.isArray(value)) {
        const first = value.find((entry): entry is string => typeof entry === "string" && Boolean(entry.trim()));
        if (first) return first;
      }
    }
  }
  return typeof body?.message === "string" && body.message.trim() ? body.message : fallback;
}
