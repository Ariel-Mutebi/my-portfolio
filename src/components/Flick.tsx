import { useRef, type FC, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FlickProps {
  onChangeOf?: unknown;
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const DIRECTION_OFFSET: Record<NonNullable<FlickProps["direction"]>, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export const Flick: FC<FlickProps> = ({
  onChangeOf,
  children,
  direction = "up",
  duration = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasChangeOf = onChangeOf !== undefined;

  useGSAP(
    () => {
      if (!ref.current) return;
      const { x, y } = DIRECTION_OFFSET[direction];
      gsap.fromTo(
        ref.current,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          ease: "back.out(1.4)",
        }
      );
    },
    { dependencies: hasChangeOf ? [onChangeOf] : [] }
  );

  return <div ref={ref}>{children}</div>;
};
