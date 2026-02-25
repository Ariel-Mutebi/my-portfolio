import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import officeFlex from "./images/office-flex.jpg";
import officeSelfie from "./images/office-selfie.jpg";
import napoleonPainting from "./images/napoleon-in-his-study.jpeg";
import { Frame } from "./Frame.tsx";
import "./Reception.css";
import { Pixelate, type PixelateHandle } from "./Pixelate.tsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Reception() {
  const wrapperRef = useRef(null);
  const pixelateRef = useRef<PixelateHandle>(null);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          markers: false,
          invalidateOnRefresh: true,
        },
        onUpdate() {
          pixelateRef.current?.setIntensity(tl.progress())
        }
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
    <div ref={wrapperRef} className="h-dvh flex items-center justify-center bg-orange-50">
      <section id="reception-grid" className="grid grid-cols-3 relative gap-8 m-8">
        <Frame id="office-flex">
          <img src={officeFlex} className="h-full" alt="boy in office doing front double biceps" />
        </Frame>

        <div className="absolute inset-0 flex justify-center items-center z-10">
          <header className="text-center" id="reception-header">
            <h1 className="montserrat text-8xl text-transparent font-black">Ariel Robert Mutebi</h1>
            <h2 className="playfair-display text-4xl italic">At AR Mutebi LLC</h2>
          </header>
        </div>

        <Frame id="office-selfie">
          <Pixelate
            ref={pixelateRef}
            src={officeSelfie}
            className="h-full"
            ariaLabel="selfie of a boy in a dressing shirt and vest"
          />
        </Frame>

        <Frame id="napoleon-painting">
          <img src={napoleonPainting} alt="Oil painting: Emperor Napoleon in his study" />
        </Frame>
      </section>
    </div>
  );
}
