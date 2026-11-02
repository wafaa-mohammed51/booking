import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";

/** Google refuses to render its button wider than 400px. */
const GOOGLE_MAX_WIDTH = 400;

// Google only accepts these preset labels — free text falls back to Google's
// own localized default.
interface GoogleBtnProps {
  text?: "signin_with" | "signup_with" | "continue_with";
}

const GoogleBtn = ({ text = "signin_with" }: GoogleBtnProps) => {
  const { mutate: googleLogin } = useGoogleLogin();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(GOOGLE_MAX_WIDTH);

  // Google's button is a fixed-pixel widget, so it can't be responsive via CSS.
  // Watch the container and hand Google a real pixel width instead.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      setWidth(Math.min(next, GOOGLE_MAX_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <GoogleLogin
        // The button only reads `width` when it mounts, so remount on resize.
        key={width}
        text={text}
        theme="outline"
        size="large"
        shape="rectangular"
        width={String(width)}
        logo_alignment="center"
        onSuccess={(credentialResponse) => {
          // This credential string is the id_token for backend
          const id_token = credentialResponse.credential;
          if (!id_token) {
            toast.error("Google didn't return a token. Please try again.");
            return;
          }
          googleLogin({ id_token });
        }}
        onError={() => toast.error("Google sign-in failed. Please try again.")}
      />
    </div>
  );
};

export default GoogleBtn;
