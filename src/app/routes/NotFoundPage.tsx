import { useRouteError, Link as RouterLink } from "react-router-dom";
import { Link } from "@/components/ui/button";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";

/** Fallback shown when a route component throws (network error, crash…). */
export function RouteErrorPage() {
  const error = useRouteError();
  const message = getApiErrorMessage(error, "Something went wrong off-screen.");

  return (
    <section className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-text-h">Something went wrong</h1>
        <p className="text-text text-sm">{message}</p>
        <div className="flex justify-center gap-3 pt-2">
          <Link variant="brand" asChild>
            <RouterLink to="/">Go to home</RouterLink>
          </Link>
          <Link
            variant="outline"
            onClick={() => window.location.reload()}
            className="cursor-pointer"
          >
            Try again
          </Link>
        </div>
      </div>
    </section>
  );
}

/** 404 — the link the user followed doesn't match any route. */
export default function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div className="max-w-md space-y-3">
        <p className="text-brand text-5xl font-bold">404</p>
        <h1 className="text-2xl font-bold text-text-h">Page not found</h1>
        <p className="text-text text-sm">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="flex justify-center pt-2">
          <Link variant="brand" asChild>
            <RouterLink to="/">Go to home</RouterLink>
          </Link>
        </div>
      </div>
    </section>
  );
}
