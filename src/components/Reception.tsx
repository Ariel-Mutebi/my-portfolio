import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import officeFlex from "./images/office-flex.jpg";
import officeSelfie from "./images/office-selfie.jpg";
import napoleonPainting from "./images/napoleon-in-his-study.jpeg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Reception() {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    const introTl = gsap.timeline({
      onComplete: createScrollAnimation,
    });

    introTl
      .fromTo(
        "#office-flex",
        { y: "-100vh", opacity: 0 },
        { y: "-2rem", opacity: 1, duration: 1, ease: "power2.out" },
        0
      )
      .fromTo(
        "#napoleon-painting",
        { y: "100vh", opacity: 0 },
        { y: "2rem", opacity: 1, duration: 1, ease: "power2.out" },
        0
      );

    function createScrollAnimation() {
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      })
        .to("#office-flex", { y: "+=100vh" }, 0)
        .to("#napoleon-painting", { y: "-=100vh" }, 0)
        .to("#reception-grid", {
          scale: 2,
          transformOrigin: "center center",
          ease: "none",
        }, 0);
    }
  }, { scope: wrapperRef });

  return (
    <main>
      <div ref={wrapperRef} className="h-dvh flex items-center justify-center">
        <section id="reception-grid" className="grid grid-cols-3 relative gap-4 m-8">
          <img src={officeFlex} id="office-flex" className="max-h-[80dvh]" alt="boy in office doing front double biceps" />
          <header className="absolute" id="reception-header">
            <h1>Ariel Robert Mutebi</h1>
            <h2>At AR Mutebi LLC</h2>
          </header>
          <img src={officeSelfie} id="office-selfie" className="max-h-[80dvh]" alt="selfie of a boy in a dressing shirt and vest" />
          <div id="napoleon-painting" className="aspect-3/4 overflow-hidden max-h-[80dvh]">
            <img src={napoleonPainting} alt="Oil painting: Emperor Napoleon in his study" />
          </div>
        </section>
      </div>
    </main>
  );
}