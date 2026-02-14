import type { FC, PropsWithChildren } from "react";

export const ThreeFourAspectRatio: FC<PropsWithChildren> = ({ children }) =>
  <div className="aspect-3/4 overflow-hidden">{children}</div>