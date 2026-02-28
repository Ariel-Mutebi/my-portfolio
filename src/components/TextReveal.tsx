import { useRef, type FC } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type TextTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TextRevealProps {
  text: string;
  startColor?: string;
  endColor?: string;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: number;
  as?: TextTag;
  className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({
  text,
  startColor = "#ecfccb",
  endColor = "#52525b",
  stagger = 0.04,
  start = "top 75%",
  end = "top 30%",
  scrub = 1,
  as: Tag = "p",
  className = "",
}) => {
  const wrapperRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const letters = wrapperRef.current?.querySelectorAll(".text-reveal-letter");
    if (!letters?.length) return;

    gsap.fromTo(
      letters,
      { color: startColor },
      {
        color: endColor,
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start,
          end,
          scrub,
        },
      }
    );
  }, { scope: wrapperRef, dependencies: [startColor, endColor, stagger, start, end, scrub] });

  return (
    <Tag ref={wrapperRef as never} className={className}>
      {text.split("").map((char, i) =>
        char === " " ? (
          " "
        ) : (
          <span key={i} className="text-reveal-letter">
            {char}
          </span>
        )
      )}
    </Tag>
  );
}
