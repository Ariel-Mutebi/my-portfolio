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
    requestAnimationFrame(() => { ready = true; });

    gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 25%",
        onEnter() {
          if (ready) handleEnter();
        },
        onEnterBack() {
          if (ready) handleEnter();
        }
      }
    });

  }, { scope: ref, dependencies: [] });

  return <div id={hash} ref={ref}>{children}</div>
}
