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

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        onEnter: callback,
      }
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>
}
