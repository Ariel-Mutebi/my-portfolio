import { memo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import lateNight from "./images/late-night.jpg";
import earlyMorning from "./images/early-morning.jpg";
import roseSelfie from "./images/rose-selfie.jpg";
import { useDimensions } from "../hooks/useDimensions.ts";
import { Flick } from "./Flick.tsx";
import { InvisibleNoiseSVG } from "./InvisibleNoiseSVG.tsx";

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
  const carouselRef = useRef(null);
  const { width: pictureWidth } = useDimensions(pictureRef);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=1200",
        scrub: true,
        pin: true,
        onUpdate(self) {
          const { progress } = self;
          if (progress < 0.3) setCurrentIndex(0);
          else if (progress < 0.6) setCurrentIndex(1);
          else setCurrentIndex(2);
        }
      }
    });
  }, { scope: wrapperRef });

  useGSAP(() => {
    gsap.to(carouselRef.current, {
      x: -currentIndex * pictureWidth,
      duration: 0.6,
      ease: "power2.inOut",
    })
  }, { scope: wrapperRef, dependencies: [currentIndex, pictureWidth ] });

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
        <div className="w-full h-full overflow-hidden relative">
          <div className="flex h-full w-full" ref={carouselRef}>
            <img
              src={lateNight}
              className="h-full w-full shrink-0 object-cover"
              alt="Me standing shirtless in my gym at 1 a.m."
            />
            <img
              src={earlyMorning}
              className="h-full w-full shrink-0 object-cover"
              alt="Laptop screen showing a time of 2:57 a.m."
            />
            <img
              src={roseSelfie}
              className="h-full w-full shrink-0 object-cover"
              alt="Me bathed in red light with a rose in my mouth."
            />
          </div>

          <InvisibleNoiseSVG baseFrequency={0.6} />

          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              filter: "url(#noise0.6)",
              opacity: 0.4,
              maskImage: "radial-gradient(ellipse at center, transparent 40%, black 100%)"
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <Flick onChangeOf={currentIndex} direction="left" duration={0.6}>
          <div
            className="montserrat font-black text-6xl"
            style={{ marginLeft: `calc(20dvw + ${pictureWidth}px - 2rem)` }}
          >
            {currentIndex === 0 && <p className="text-slate-400">of consistency</p>}
            {currentIndex === 1 && <p className="text-blue-400">of focus</p>}
            {currentIndex === 2 && <p className="text-rose-400">and passion</p>}
          </div>
        </Flick>
      </div>
    </article>
  );
}
