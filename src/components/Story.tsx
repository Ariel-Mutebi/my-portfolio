import { useRef, useState, createRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PARAGRAPHS } from "../constants/paragraphs.ts";
import "./Story.css";

gsap.registerPlugin(ScrollTrigger);

export function Story() {
  const containerRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const paragraphRefs = useRef(PARAGRAPHS.map(() => createRef<HTMLParagraphElement>())).current;

  useGSAP(
    () => {
      paragraphRefs.forEach((ref: RefObject<HTMLParagraphElement | null>, i: number) => {
        if (!ref.current) return;

        ScrollTrigger.create({
          trigger: ref.current,

          start: "top center",
          end: "bottom center",

          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!focusRef.current) return;

      gsap.fromTo(
        focusRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    },
    { dependencies: [activeIndex] }
  );

  return (
    <section
      id="story"
      ref={containerRef}
      className="min-h-dvh p-8 pb-[60vh]"
    >
      <h1 className="roboto-mono font-semibold text-white text-6xl text-center sticky top-0 z-10">
        Building better every day
      </h1>

      <div
        ref={focusRef}
        className="
          sticky top-26 z-10 open-sans text-2xl text-slate-200 py-8 rounded-2xl
          bg-slate-900/10 backdrop-blur-sm border-2 border-white/10 shadow-2xl p-8
          bg-linear-to-b from-white/10 to-white/0"
      >
        <p>{PARAGRAPHS[activeIndex]}</p>
      </div>

      <div className="open-sans text-2xl text-slate-400 space-y-16">
        {PARAGRAPHS.map((text: string, i: number) => (
          <p
            key={i}
            ref={paragraphRefs[i]}
            className={i <= activeIndex ? "opacity-0" : "opacity-100"}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}