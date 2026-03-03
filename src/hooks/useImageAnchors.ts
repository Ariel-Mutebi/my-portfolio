import { useState, useEffect, useRef } from "react";

// Pixel-perfect, baby!
export function useImageAnchors(targets: [number, number][]) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(0);
  const [positions, setPositions] = useState(
    targets.map(() => ({ top: 0, left: 0 }))
  );

  useEffect(() => {
    const recalculate = () => {
      const img = imgRef.current;
      if (!img) return;

      const { naturalWidth, naturalHeight } = img;
      const { width: renderedWidth, height: renderedHeight } =
        img.getBoundingClientRect();

      const scale = Math.max(renderedWidth / naturalWidth, renderedHeight / naturalHeight);
      setScale(scale);

      const scaledW = naturalWidth * scale;
      const scaledH = naturalHeight * scale;
      const offsetX = (renderedWidth - scaledW) / 2;
      const offsetY = (renderedHeight - scaledH) / 2;

      setPositions(targets.map(([x, y]) => ({
        top: offsetY + y * scaledH,
        left: offsetX + x * scaledW,
      })));
    };

    const img = imgRef.current;
    if (!img) return;

    img.addEventListener("load", recalculate);
    window.addEventListener("resize", recalculate);
    recalculate();

    return () => {
      img.removeEventListener("load", recalculate);
      window.removeEventListener("resize", recalculate);
    };
  }, [targets]);

  return { imgRef, scale, positions };
}
