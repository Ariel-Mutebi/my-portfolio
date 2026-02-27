import { CallOnScrollEnter } from "./components/CallOnScrollEnter.tsx";
import { Ethos } from "./components/Ethos.tsx";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";

const HASHES = ["#reception", "#story", "#ethos", "#collab"];

export default function App() {
  const { hash, navigate } = useHashRoute("#reception");

  if (hash === "#reception") {
    return <Reception passTheBatonForward={() => navigate(HASHES[1])} />;
  }

  const mainSections = [<Story />, <Ethos />];

  return (
    <main className="relative">
      <button
        type="button"
        onClick={() => navigate(HASHES[0])}
        className="
          absolute top-0.5 left-0.5 bg-blue-900 text-slate-400 w-20 h-20 text-4xl
          cursor-pointer shadow-[inset_4px_4px_0px_rgba(0,0,0,0.25)] border border-slate-600
        hover:text-slate-300 active:text-slate-200 active:shadow-none"
      >
        &lt;
      </button>
      {mainSections.map((section, i) => (
        <CallOnScrollEnter callback={() => navigate(HASHES[i + 1])} key={HASHES[i + 1]}>
          {section}
        </CallOnScrollEnter>
      ))}
    </main>
  );
}