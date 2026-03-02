import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type PropsWithChildren, type FC, useRef } from "react";

interface UpdateHashOnEnterProps extends PropsWithChildren {
  hash: string;
  navigate: (hash: string) => void;
}

export const UpdateHashOnEnter: FC<UpdateHashOnEnterProps> = ({
  hash,
  navigate,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleEnter = () => navigate(hash);

  useGSAP(() => {
    let ready = false;
    // Let the browser to scroll to the section in the URL hash first.
    const timeout = setTimeout(() => { ready = true; }, 250);

    gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        onEnter() {
          if (ready) handleEnter();
        },
        onEnterBack() {
          if (ready) handleEnter();
        }
      }
    });

    return () => clearTimeout(timeout);
  }, { scope: ref, dependencies: [] });

  return <div id={hash} ref={ref}>{children}</div>
}
