import type { FC, PropsWithChildren } from "react";

interface FrameProps extends PropsWithChildren {
  id: string;
}

export const Frame: FC<FrameProps> = ({ children, id }) =>
  <div id={id} className="aspect-3/4 overflow-hidden max-h-[80dvh] border-8 border-solid border-stone-500">
    {children}
  </div>
