import type { FC } from "react";

interface InvisibleNoiseSVGProps {
  baseFrequency: number;
}

export const InvisibleNoiseSVG: FC<InvisibleNoiseSVGProps> = ({ baseFrequency }) => (
  <svg className="absolute h-0 w-0">
    <defs>
      <filter id={`noise${baseFrequency}`}>
        <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves="3" stitchTiles="stitch" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
      </filter>
    </defs>
  </svg>
);
