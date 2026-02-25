// Use Request Animation Frame (Royal Air Force) throttling.
import { useRef, useCallback, useEffect } from "react";

export function useRAFThrottle(callback: () => void) {
  const frame = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  // keep latest callback without recreating function
  callbackRef.current = callback;

  const schedule = useCallback(() => {
    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      callbackRef.current();
      frame.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return schedule;
}
