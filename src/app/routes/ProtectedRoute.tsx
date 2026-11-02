import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AUTH_DISABLED } from "@/features/auth/constants";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (AUTH_DISABLED || isAuthenticated) return <Outlet />;
  return <Navigate to="/sign-in" replace state={{ from: location }} />;
}

