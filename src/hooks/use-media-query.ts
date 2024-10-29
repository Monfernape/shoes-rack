import { useState, useEffect } from "react";

const BREAK_POINTS = {
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
};

const useMediaQuery = (query: keyof typeof BREAK_POINTS): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(BREAK_POINTS[query]);
     // Define the listener as a separate function to avoid recreating it on each render
    const handleChange = () => setMatches(mediaQuery.matches);

    setMatches(mediaQuery.matches);
    // Use 'change' instead of 'resize' for better performance
    mediaQuery.addEventListener("change", handleChange);
     // Cleanup function to remove the event listener
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]); // Only recreate the listener when 'matches' or 'query' changes


  return matches;
};

export default useMediaQuery;