import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type PropsWithChildren, type FC, useRef } from "react";

interface CallOnScrollEnterProps extends PropsWithChildren {
  callback: () => void;
}

export const CallOnScrollEnter: FC<CallOnScrollEnterProps> = ({
  callback,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useGSAP(() => {
    let ready = false;
    // Let the browser to scroll to the section in the URL hash first.
    const timeout = setTimeout(() => { ready = true; }, 100);

    gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        onEnter: () => ready && callbackRef.current(),
        onEnterBack: () => ready && callbackRef.current(),
      }
    });

    return () => clearTimeout(timeout);
  }, { scope: ref, dependencies: [] });

  return <div ref={ref}>{children}</div>
}
