import { useRef, useState, createRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PARAGRAPHS } from "../constants/paragraphs.ts";
import "./Story.css";

export function Story() {
  const containerRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const paragraphRefs = useRef<React.RefObject<HTMLParagraphElement | null>[]>(
    PARAGRAPHS.map(() => createRef<HTMLParagraphElement>())
  ).current;

  useGSAP(() => {
    paragraphRefs.forEach((ref, i) => {
      if (!ref.current) return;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center+=100",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    if (!focusRef.current) return;
    gsap.fromTo(
      focusRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, { dependencies: [activeIndex] });

  return (
    <section id="story" className="min-h-dvh p-8 pb-[50dvh]" ref={containerRef}>
      <h1 className="roboto-mono font-semibold text-white text-6xl text-center sticky top-0 z-10">
        Building better every day
      </h1>

      <div ref={focusRef} className="open-sans text-2xl text-slate-200">
        <p>{PARAGRAPHS[activeIndex]}</p>
      </div>

      <div id="story-text" className="open-sans text-2xl text-slate-400">
        {PARAGRAPHS.slice(activeIndex + 1).map((text, i) => (
          <p key={activeIndex + 1 + i} ref={paragraphRefs[activeIndex + 1 + i]}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}