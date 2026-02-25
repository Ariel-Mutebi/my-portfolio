import { useEffect, useRef } from "react";

export function useTopBoundaryIntent(onBoundary: () => void) {
  const lastY = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (lastY.current === null) {
        // first scroll event after mount, just initialize
        lastY.current = currentY;
        return;
      }

      const scrollingUp = currentY <= lastY.current;
      const atTop = currentY === 0;

      if (atTop && scrollingUp) {
        onBoundary();
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onBoundary]);
}