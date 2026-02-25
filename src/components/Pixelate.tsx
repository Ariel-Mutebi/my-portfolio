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
      const pixelProgress = Math.pow(amount, 3);
      const scale = 1 + Math.floor(pixelProgress * 120);
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
      const tileSize = 6 + amount * 24; // BIGGER blocks
      const noiseChance = amount * 0.35;

      for (let y = 0; y < h; y += tileSize) {
        for (let x = 0; x < w; x += tileSize) {

          if (Math.random() < noiseChance) {
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, tileSize, tileSize);
          }

        }
      }
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