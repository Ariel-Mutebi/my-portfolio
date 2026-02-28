import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "./TextReveal.tsx";
import seatedPortrait from "./images/seated-portrait.jpg";
import "./Ethos.css";
import gsap from "gsap";

export function Ethos() {
  const sectionRef = useRef(null);
  const confidenceRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600",
        scrub: true,
        pin: true,
      },
    }).fromTo(
      [imageRef.current, confidenceRef.current],
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, ease: "power2.out" }
    );
  });

  return (
    <section id="ethos" ref={sectionRef}>
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
        <div ref={imageRef} className="grow min-h-0" style={{ opacity: 0 }}>
          <img src={seatedPortrait} className="h-full w-full object-cover object-center" alt="Ariel seated" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            ref={confidenceRef}
            className="montserrat text-6xl font-bold mix-blend-difference text-white opacity-0"
          >
            confidence
          </p>
        </div>
      </article>
    </section>
  );
}