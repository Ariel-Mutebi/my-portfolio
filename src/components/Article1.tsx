import gsap from "gsap";
import { useRef, type FC, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "./TextReveal.tsx";
import seatedPortrait from "./images/seated-portrait.jpg";
import { useReader } from "../hooks/useReader.tsx";
import "./Article1.css";
import { Flick } from "./Flick.tsx";

const WORDS = ["confidence", "competence", "and professionalism"];

interface WordProps {
  firstWordRef?: RefObject<HTMLParagraphElement | null>;
  index: number;
}

const DisplayedWord: FC<WordProps> = ({ firstWordRef, index }) => {
  const word = WORDS[index];

  switch (index) {
    case 0:
      return (
        <p
          ref={firstWordRef}
          className="montserrat text-6xl font-bold mix-blend-difference text-white opacity-0"
        >
          {word}
        </p>
      );
  /**
   * Subsequent ones use <Flick />
   */
    default:
      break;
  }
};

interface BackgroundProps {
  firstImageRef?: RefObject<HTMLImageElement | null>;
  index: number;
}

const Background: FC<BackgroundProps> = ({ firstImageRef, index }) => {
  switch (index) {
    case 0:
      return (
        <img
          ref={firstImageRef}
          src={seatedPortrait}
          className="h-full w-full object-cover object-center"
          alt="Ariel seated" />
      )
  
    default:
      return <span />;
  }
};

export function Article1() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    textRefs,
    currentIndex,
  } = useReader<HTMLDivElement>({ texts: WORDS, scopeRef: wrapperRef });

  const firstWordRef = useRef<HTMLParagraphElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=600",
        scrub: true,
        pin: true,
      },
    }).fromTo(
      [firstImageRef.current, firstWordRef.current],
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, ease: "power2.out" }
    );
  });

  return (
    <div ref={wrapperRef}>
      <article className="bg-lime-200 h-dvh relative flex flex-col">
        <h2
          className="playfair-display text-8xl text-zinc-800 pt-8 pr-24 text-right z-10 relative"
        >
          The Ariel <span className="italic ethos-gradient tracking-wide">Ethos</span>
        </h2>

        <TextReveal
          text="Creating lasting first impressions of"
          className="ml-[20dvw] my-8 text-4xl montserrat z-10 relative"
          startColor="hsl(80.7 90% 79%)"
          endColor="hsl(240.13 6% 34%)"
        />

        <div className="grow min-h-0">
          <Background index={currentIndex} firstImageRef={firstImageRef} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <DisplayedWord index={currentIndex} firstWordRef={firstWordRef} />
        </div>
      </article>

      {/* Scroll triggers - invisible spacers that drive the index
      <div>
        {WORDS.map((word, i) => (
          <div
            key={word}
            ref={textRefs[i]}
            className="h-[25dvh]"
            aria-hidden="true"
          />
        ))}
      </div> */}
    </div>
  );
}
