import { useRef, useState, createRef, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface UseReaderOptions {
  texts: string[];
  scopeRef: RefObject<HTMLElement | null>;
}

interface UseReaderReturn {
  currentIndex: number;
  textRefs: RefObject<HTMLParagraphElement | null>[];
}

export function useReader({ texts, scopeRef }: UseReaderOptions): UseReaderReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRefs = useRef(texts.map(() => createRef<HTMLParagraphElement>())).current;

  useGSAP(
    () => {
      textRefs.forEach((ref: RefObject<HTMLElement | null>, i: number) => {
        if (!ref.current) return;
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentIndex(i),
          onEnterBack: () => setCurrentIndex(i),
        });
      });
    },
    { scope: scopeRef }
  );

  return { currentIndex, textRefs };
}