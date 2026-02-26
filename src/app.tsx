import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";

export default function App() {
  const { hash, navigate } = useHashRoute("#reception");
  const passTheBatonForward = () => navigate("#story");
  const passTheBatonBackward = () => navigate("#reception");

  return hash === "#reception" ?
    <Reception passTheBatonForward={passTheBatonForward} /> :
    <main className="relative">
      <button
        type="button"
        onClick={passTheBatonBackward}
        className="
          absolute top-0.5 left-0.5 bg-blue-900 text-slate-400 w-20 h-20 text-4xl
          cursor-pointer shadow-[inset_4px_4px_0px_rgba(0,0,0,0.25)] border border-slate-600
        hover:text-slate-300 active:text-slate-200 active:shadow-none"
      >
        &lt;
      </button>
      <Story />
    </main>;
}