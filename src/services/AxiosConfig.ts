import axios from "axios";
import type { AxiosError } from "axios";
import { tokenStorage } from "@/features/auth/utils/tokenStorage";

/**
 * Base API URL from the environment (see README "Environment Variables" and
 * `.env.example`). The app does NOT ship a hard-coded backend, so this value
 * is required for every request — without it the browser would silently send
 * API calls to the app's own origin and get back HTML instead of JSON.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Fail fast with an honest, actionable error instead of hitting this
    // app's own origin (where every path returns index.html and axios fails
    // parsing "Unexpected token <" — which looks like a bug in the UI).
    if (!API_BASE_URL) {
      return Promise.reject(
        new Error(
          "API is not configured: set VITE_API_URL (for example https://your-backend.example.com/api/) in a .env.local file and restart the dev server.",
        ),
      );
    }
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string } | undefined)
      ?.message;

    // This API reports auth failures as a 500 "Route [login] not defined."
    // (Laravel redirecting to a `login` route that doesn't exist in an API-only
    // app) instead of a 401. Without treating it as an auth failure, an expired
    // token is never cleared and the UI stays "logged in" while every protected
    // request fails.
    const isAuthFailure =
      status === 401 ||
      (status === 500 && Boolean(message?.includes("Route [login] not defined")));

    if (isAuthFailure) {
      tokenStorage.clear();

      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
