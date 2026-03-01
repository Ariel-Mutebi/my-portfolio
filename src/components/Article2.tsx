import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import lateNight from "./images/late-night.jpg";
import earlyMorning from "./images/early-morning.jpg";
import roseSelfie from "./images/rose-selfie.jpg";
import { useDimensions } from "../hooks/useDimensions.ts";

const Header = memo(() => {
  const headerRef = useRef(null);
  const underlineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: true,
        },
      }
    );
  }, { scope: headerRef });

  return (
    <h2
      ref={headerRef}
      className="mb-8 text-6xl montserrat font-bold text-stone-200 inline-block z-10"
    >
      Working every day at the highest level
      <span
        ref={underlineRef}
        className="block h-1 bg-stone-400 mt-2 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </h2>
  );
});

export function Article2() {
  const wrapperRef = useRef(null);
  const pictureRef = useRef(null);
  const { width: pictureWidth } = useDimensions(pictureRef);

  return (
    <article
      ref={wrapperRef}
      className="h-dvh p-8 flex flex-col items-start bg-stone-800 relative"
    >
      <Header />

      <div
        ref={pictureRef}
        className="bg-orange-100 p-2 pb-8 ml-[20dvw] grow aspect-square min-h-0"
      >
        <div className="w-full h-full flex overflow-hidden relative">
          <img className="h-full w-full shrink-0 object-cover" src={lateNight} alt="Ariel standing shirtless in his gym at 1 a.m." />
          <img className="h-full w-full shrink-0 object-cover" src={earlyMorning} alt="Laptop screen showing a time of 2:57 a.m." />
          <img className="h-full w-full shrink-0 object-cover" src={roseSelfie} alt="Ariel bathed in red light with a rose in his mouth." />

          {/* Hidden SVG defining the filter */}
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
              </filter>
            </defs>
          </svg>

          {/* Overlay div referencing the filter */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              filter: "url(#noise)",
              opacity: 0.4,
              maskImage: "radial-gradient(ellipse at center, transparent 40%, black 100%)"
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <p
          className="text-slate-400 font-black text-6xl"
          style={{ marginLeft: `calc(20dvw + ${pictureWidth}px - 1.5rem)` }}
        >
          of consistency
        </p>
      </div>
    </article>
  );
}