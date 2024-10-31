import { useState, useEffect, useMemo } from "react";

const BREAK_POINTS = {
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
};

const useMediaQuery = (query: keyof typeof BREAK_POINTS): boolean => {
  const mediaQueryString = useMemo(() => BREAK_POINTS[query], [query]);
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(mediaQueryString);
      const handleChange = () => setMatches(mediaQuery.matches);

      // Set the initial match state
      setMatches(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [mediaQueryString]);  // Recreate the listener only when the media query string changes

  return matches;
};

export default useMediaQuery;
