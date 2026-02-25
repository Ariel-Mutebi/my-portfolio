import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRAFThrottle } from "../hooks/useRAFThrottle.ts";

export interface PixelateHandle {
  setIntensity: (value: number) => void;
}

interface PixelateProps {
  src: string;
  ariaLabel?: string;
  className?: string;
}

export const Pixelate = forwardRef<PixelateHandle, PixelateProps>(
  ({ src, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    function draw(amount: number) {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const img = imgRef.current;

      if (!canvas || !ctx || !img) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // ---- Pixelation ----
      const scale = Math.max(1, Math.floor(40 * amount));

      ctx.imageSmoothingEnabled = false;

      // draw reduced
      ctx.drawImage(img, 0, 0, w / scale, h / scale);

      // scale back up
      ctx.drawImage(
        canvas,
        0,
        0,
        w / scale,
        h / scale,
        0,
        0,
        w,
        h
      );

      // ---- Noise ----
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      const noiseStrength = amount * 0.25;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < noiseStrength) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    /* ---------- RAF throttled draw ---------- */

    const throttledDraw = useRAFThrottle<number>((value) => {
      draw(value);
    });

    /* ---------- Imperative API ---------- */

    useImperativeHandle(ref, () => ({
      setIntensity(value: number) {
        const clamped = Math.max(0, Math.min(1, value));
        throttledDraw(clamped);
      },
    }));

    /* ---------- Image setup ---------- */

    useEffect(() => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        imgRef.current = img;

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;

        ctxRef.current = canvas.getContext("2d");

        draw(0);
      };
    }, [src]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          imageRendering: "pixelated",
        }}
      />
    );
  }
);

Pixelate.displayName = "Pixelate";

export default Pixelate;