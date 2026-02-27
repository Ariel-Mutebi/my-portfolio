import { CallOnScrollEnter } from "./components/CallOnScrollEnter.tsx";
import { Ethos } from "./components/Ethos.tsx";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";

export default function App() {
  const { hash, navigate } = useHashRoute("#reception");

  if (hash === "#reception") {
    return <Reception passTheBatonForward={() => navigate("#story")} />;
  }

  return (
    <main className="relative">
      <CallOnScrollEnter callback={() => navigate("#story")}>
        <Story passTheBatonBack={() => navigate("#reception")} />
      </CallOnScrollEnter>
      <CallOnScrollEnter callback={() => navigate("#ethos")}>
        <Ethos />
      </CallOnScrollEnter>
    </main>
  );
}