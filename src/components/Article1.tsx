import gsap from "gsap";
import { useRef, useState, type FC, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "./TextReveal.tsx";
import seatedPortrait from "./images/seated-portrait.jpg";
import bossShoes from "./images/boss-shoes.jpg";
import "./Article1.css";
import { Flick } from "./Flick.tsx";

const WORDS = ["confidence", "competence", "and professionalism"];

interface WordProps {
  firstWordRef?: RefObject<HTMLParagraphElement | null>;
  index: number;
}

const DisplayedWord: FC<WordProps> = ({ firstWordRef, index }) => {
  return (
    <>
      <p
        ref={firstWordRef}
        className="montserrat text-6xl font-bold mix-blend-difference text-white"
        style={{ display: index === 0 ? "block" : "none" }}
      >
        {WORDS[0]}
      </p>
      <Flick direction="up" onChangeOf={index} duration={0.5}>
        {index === 1 && <p className="montserrat text-6xl font-bold text-sky-200">{WORDS[1]}</p>}
        {index === 2 && <p className="montserrat text-6xl font-bold text-emerald-200">{WORDS[2]}</p>}
      </Flick>
    </>
  );
};

interface BackgroundProps {
  firstImageRef?: RefObject<HTMLImageElement | null>;
  index: number;
}

const Background: FC<BackgroundProps> = ({ firstImageRef, index }) => {
  return (
    <>
      <img
        ref={firstImageRef}
        src={seatedPortrait}
        className="h-full w-full object-cover object-center absolute inset-0"
        style={{ display: index === 0 ? "block" : "none" }}
        alt="Ariel seated"
      />
      <div
        className="h-full w-full bg-sky-800 absolute inset-0"
        style={{ display: index === 1 ? "block" : "none" }}
      />
      <img
        src={bossShoes}
        className="h-full w-full object-cover object-center absolute inset-0"
        style={{ display: index === 2 ? "block" : "none" }}
        alt="Feet in socks and black leather derby shoes"
      />
    </>
  );
};

export function Article1() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstWordRef = useRef<HTMLParagraphElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.6) setCurrentIndex(0);
          else if (p < 0.8) setCurrentIndex(1);
          else setCurrentIndex(2);
        },
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
        <h2 className="playfair-display text-8xl text-zinc-800 pt-8 pr-24 text-right z-10 relative">
          The Ariel <span className="italic ethos-gradient tracking-wide">Ethos</span>
        </h2>
        <TextReveal
          text="Creating lasting first impressions of"
          className="ml-[20dvw] my-8 text-4xl montserrat z-10 relative"
          startColor="hsl(80.7 90% 79%)"
          endColor="hsl(240.13 6% 34%)"
        />
        <div className="grow min-h-0 relative">
          <Background index={currentIndex} firstImageRef={firstImageRef} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <DisplayedWord index={currentIndex} firstWordRef={firstWordRef} />
        </div>
      </article>
    </div>
  );
}