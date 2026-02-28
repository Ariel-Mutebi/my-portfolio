import { useRef, useState, createRef, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type TextRefType = HTMLParagraphElement | HTMLDivElement;

interface UseReaderOptions {
  texts: string[];
  scopeRef: RefObject<HTMLElement | null>;
}

interface UseReaderReturn<T extends HTMLElement = TextRefType> {
  currentIndex: number;
  textRefs: RefObject<T | null>[];
}

export function useReader<T extends HTMLElement = HTMLParagraphElement>(
  { texts, scopeRef }: UseReaderOptions
): UseReaderReturn<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRefs = useRef(texts.map(() => createRef<T>())).current;

  useGSAP(
    () => {
      textRefs.forEach((ref, i) => {
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