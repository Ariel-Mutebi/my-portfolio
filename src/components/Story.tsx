import { useRef, useState, createRef, type RefObject, useEffect, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PARAGRAPHS } from "../constants/paragraphs.ts";
import { Flick } from "./Flick.tsx";
import "./Story.css";

gsap.registerPlugin(ScrollTrigger);

interface StoryProps {
  passTheBatonBack: () => void;
}

export const Story: FC<StoryProps> = ({ passTheBatonBack }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const paragraphRefs = useRef(
    PARAGRAPHS.map(() => createRef<HTMLParagraphElement>())
  ).current;

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section
      id="story"
      ref={containerRef}
      className="min-h-dvh p-8 pb-[25vh] relative"
    >
      <button
        type="button"
        onClick={passTheBatonBack}
        className="
          absolute top-0.5 left-0.5 bg-blue-900 text-slate-400 w-20 h-20 text-4xl
          cursor-pointer shadow-[inset_4px_4px_0px_rgba(0,0,0,0.25)] border border-slate-600
          hover:text-slate-300 active:text-slate-200 active:shadow-none"
      >
        &lt;
      </button>

      <h1
        ref={headerRef}
        className="
          roboto-mono font-semibold text-white text-6xl
          text-center sticky top-0 z-10 py-4 mx-20"
      >
        Building better every day
      </h1>

      <div
        style={{ top: headerHeight + 32 }}
        className="
          sticky z-10 open-sans text-2xl text-slate-200 py-8 rounded-2xl
          bg-slate-900/10 backdrop-blur-sm border-2 border-white/10 shadow-2xl p-8
          bg-linear-to-b from-white/10 to-white/0"
      >
        <Flick onChangeOf={activeIndex} direction="up">
          <p>{PARAGRAPHS[activeIndex]}</p>
        </Flick>
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
};