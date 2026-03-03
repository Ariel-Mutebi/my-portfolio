import { useImageAnchors } from "../hooks/useImageAnchors.ts";
import myFriendAndMe from "./images/my-friend-and-me.jpg";

const ANCHORS: [number, number][] = [
  [0.23, 0.38],
  [0.24, 0.45],
];

export function Article5() {
  const { imgRef, scale, positions } = useImageAnchors(ANCHORS);

  return (
    <div
      id="collaborate-container"
      className="h-dvh relative open-sans"
    >
      <img
        ref={imgRef}
        src={myFriendAndMe}
        alt="my friend and I shaking hands"
        className="h-full w-full object-cover object-center"
      />
      <p
        className="absolute text-slate-400"
        style={{
          ...positions[0],
          fontSize: scale * 300
        }}
      >
        Let's
      </p>
      <p
        className="absolute text-orange-400 inline-flex items-center"
        style={{
          ...positions[1],
          fontSize: scale * 360,
        }}
      >
        <span className="inline-block translate-y-3">C</span>
        <span className="inline-block scale-x-225 scale-y-150 mx-[0.2em] origin-center">o</span>
        <span className="inline-block translate-y-3">llaborate</span>
      </p>
    </div>
  );
}
