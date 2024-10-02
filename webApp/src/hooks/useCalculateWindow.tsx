import { useEffect, useState } from "react";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

/**
 * Calculate in real time size window
 * @returns Object with window.innerWidth and window.innerHeight
 */
export const useCalculateWindow = () => {
  const [windowSize, setwindowSize] = useState(getWindowSize());

  // Handle size menu
  useEffect(() => {
    function calculateSizeWindow() {
      setwindowSize(getWindowSize());
    }
    window.addEventListener("resize", calculateSizeWindow);
    return () => window.removeEventListener("resize", calculateSizeWindow);
  }, []);
  return windowSize;
};
