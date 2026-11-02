import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Central scroll behaviour:
 * - a plain route change resets the scroll to the top;
 * - a route carrying a #hash (footer "FAQs", "How it works", the specialists
 *   map button…) smooth-scrolls to that section instead.
 */
export default function ScrollToRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Give the target section a frame to render before scrolling.
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
