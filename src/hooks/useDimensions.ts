import { useEffect, useState, type RefObject } from "react";

interface Dimensions {
  height: number;
  width: number;
}

export function useDimensions(observed: RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (!observed.current) return;

    const observer = new ResizeObserver(([{ contentRect: { height, width } }]) => {
      setDimensions({ height, width });
    });

    observer.observe(observed.current);
    return () => observer.disconnect();
  }, []);

  return dimensions;
}