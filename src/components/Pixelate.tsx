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

/**
 * Draw noise aligned to pixel blocks
 */
function drawNoise(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number,
  intensity: number
) {
  const tileSize = scale * 4; // noise tile = pixel block size
  const density = intensity * 0.35;

  ctx.fillStyle = "black";

  for (let y = 0; y < h; y += tileSize) {
    for (let x = 0; x < w; x += tileSize) {
      if (Math.random() < density) {
        ctx.fillRect(x, y, tileSize, tileSize);
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
    const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const tempCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    function draw() {
      const intensity = intensityRef.current;
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const img = imgRef.current;
      const temp = tempCanvasRef.current;
      const tempCtx = tempCtxRef.current;

      if (!canvas || !ctx || !img || !temp || !tempCtx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (intensity < 0.05) {
        ctx.drawImage(img, 0, 0, w, h);
        return;
      }

      // --- compute pixelation scale ---
      const raw = 1 + Math.floor(Math.pow(intensity, 10) * 128);
      const scale = Math.pow(2, Math.floor(Math.log2(raw)));

      // --- pixelate in temp canvas ---
      temp.width = Math.ceil(w / scale);
      temp.height = Math.ceil(h / scale);
      tempCtx.imageSmoothingEnabled = false;

      tempCtx.clearRect(0, 0, temp.width, temp.height);
      tempCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        temp.width,
        temp.height
      );

      // --- draw pixelated temp canvas to display ---
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        temp,
        0,
        0,
        temp.width,
        temp.height,
        0,
        0,
        w,
        h
      );

      // --- add dynamic noise ---
      drawNoise(ctx, w, h, scale, intensity);
    }

    // --- dynamic noise loop (12 FPS) ---
    useEffect(() => {
      function startNoiseLoop() {
        if (noiseTimerRef.current !== null) return;

        noiseTimerRef.current = window.setInterval(() => {
          if (intensityRef.current > 0.05) draw();
        }, 1000 / 12);
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

    // --- throttled draw to avoid RAF overload ---
    const throttledDraw = useRAFThrottle(draw);

    // --- imperative API ---
    useImperativeHandle(ref, () => ({
      setIntensity(value: number) {
        intensityRef.current = Math.max(0, Math.min(1, value));
        throttledDraw();
      },
    }));

    // --- image setup ---
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

        // temporary canvas for pixelation
        const temp = document.createElement("canvas");
        const tempCtx = temp.getContext("2d");
        if (!tempCtx) return;

        tempCanvasRef.current = temp;
        tempCtxRef.current = tempCtx;

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