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

function drawNoise(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number,
  intensity: number
) {
  const density = intensity * 0.35;
  ctx.fillStyle = "black";

  for (let y = 0; y < h; y += scale) {
    for (let x = 0; x < w; x += scale) {
      if (Math.random() < density) {
        ctx.fillRect(x, y, scale, scale);
      }
    }
  }
}

export const Pixelate = forwardRef<PixelateHandle, PixelateProps>(
  ({ src, ariaLabel, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const intensityRef = useRef(0);
    const noiseTimerRef = useRef<number | null>(null);

    function draw() {
      const intensity = intensityRef.current;
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const img = imgRef.current;

      if (!canvas || !ctx || !img) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (intensity < 0.05) {
        ctx.drawImage(img, 0, 0, w, h);
        return;
      }

      // ---- Pixelation ----
      const scale = 1 + Math.floor(Math.pow(intensity, 4) * 100);

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
      drawNoise(ctx, w, h, scale, intensity);
    }

    useEffect(() => {
      function startNoiseLoop() {
        if (noiseTimerRef.current !== null) return;

        noiseTimerRef.current = window.setInterval(() => {
          if (intensityRef.current > 0.05) {
            draw();
          }
        }, 1000 / 12); // 12 FPS noise
      }

      function stopNoiseLoop() {
        if (noiseTimerRef.current !== null) {
          clearInterval(noiseTimerRef.current);
          noiseTimerRef.current = null;
        }
      }

      startNoiseLoop();

      return stopNoiseLoop;
    }, []);

    /* ---------- RAF throttled draw ---------- */

    const throttledDraw = useRAFThrottle(draw);

    /* ---------- Imperative API ---------- */

    useImperativeHandle(ref, () => ({
      setIntensity(value: number) {
        intensityRef.current = Math.max(0, Math.min(1, value));
        throttledDraw();
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

        draw();
      };
    }, [src]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        aria-label={ariaLabel}
        style={{
          imageRendering: "pixelated",
        }}
      />
    );
  }
);

Pixelate.displayName = "Pixelate";

export default Pixelate;