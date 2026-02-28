import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Article2() {
  const containerRef = useRef(null);
  const underlineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <article className="h-dvh bg-stone-800">
      <h2
        ref={containerRef}
        className="p-8 text-6xl montserrat font-bold text-stone-200 inline-block"
      >
        Working every day at the highest level
        <span
          ref={underlineRef}
          className="block h-1 bg-stone-400 mt-2 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </h2>
    </article>
  );
}