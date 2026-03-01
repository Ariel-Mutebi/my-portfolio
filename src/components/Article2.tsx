import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import lateNight from "./images/late-night.jpg";
import earlyMorning from "./images/early-morning.jpg";
import roseSelfie from "./images/rose-selfie.jpg";

export function Article2() {
  const headerRef = useRef(null);
  const underlineRef = useRef(null);
  const wrapperRef = useRef(null);

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
    <article className="h-dvh p-8 flex flex-col items-start bg-stone-800" ref={wrapperRef}>
      <h2
        ref={headerRef}
        className="mb-8 text-6xl montserrat font-bold text-stone-200 inline-block"
      >
        Working every day at the highest level
        <span
          ref={underlineRef}
          className="block h-1 bg-stone-400 mt-2 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </h2>
      <div className="bg-orange-100 p-2 pb-8 ml-[20dvw] grow aspect-square min-h-0">
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
    </article>
  );
}