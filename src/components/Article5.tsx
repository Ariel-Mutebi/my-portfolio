import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageAnchors } from "../hooks/useImageAnchors.ts";
import myFriendAndMe from "./images/my-friend-and-me.jpg";

gsap.registerPlugin(ScrollTrigger);

const ANCHORS: [number, number][] = [
  [0.23, 0.38],
  [0.24, 0.45],
];

export function Article5() {
  const { imgRef, scale, positions } = useImageAnchors(ANCHORS);
  const containerRef = useRef<HTMLElement>(null);
  const cRef = useRef<HTMLSpanElement>(null);
  const oRef = useRef<HTMLSpanElement>(null);
  const llaborateRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 5%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(cRef.current,
      { y: 0 },
      { y: "0.11em", duration: 0.6, ease: "power3.out" }
    )
      .fromTo(oRef.current,
        { scaleX: 1, scaleY: 1, marginInline: 0 },
        { scaleX: 2.25, scaleY: 1.5, marginInline: "0.2em", duration: 0.6, ease: "power3.out" },
        "<"
      )
      .fromTo(llaborateRef.current,
        { y: 0 },
        { y: "0.11em", duration: 0.6, ease: "power3.out" },
        "<"
      );
  }, { scope: containerRef });

  return (
    <article ref={containerRef} className="h-dvh relative open-sans">
      <img
        ref={imgRef}
        src={myFriendAndMe}
        alt="my friend and I shaking hands"
        className="h-full w-full object-cover object-center"
      />
      <p
        className="absolute text-slate-400"
        style={{ ...positions[0], fontSize: scale * 300 }}
      >
        Let's
      </p>
      <p
        className="absolute text-orange-400 inline-flex items-center"
        style={{ ...positions[1], fontSize: scale * 360 }}
      >
        <span ref={cRef} className="inline-block">C</span>
        <span ref={oRef} className="inline-block origin-center">o</span>
        <span ref={llaborateRef} className="inline-block">llaborate</span>
      </p>
      <footer className="absolute top-[80%] h-[20%]"></footer>
    </article>
  );
}