// Use Request Animation Frame (Royal Air Force) throttling.
import { useRef, useCallback, useEffect } from "react";

export function useRAFThrottle<T>(
  callback: (value: T) => void
) {
  const frame = useRef<number | null>(null);
  const latestValue = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  // keep latest callback without recreating function
  callbackRef.current = callback;

  const schedule = useCallback((value: T) => {
    latestValue.current = value;

    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      if (latestValue.current !== null) {
        callbackRef.current(latestValue.current);
      }
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
