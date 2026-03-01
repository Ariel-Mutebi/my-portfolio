import { Article1 } from "./components/Article1.tsx";
import { Article2 } from "./components/Article2.tsx";
import { Article3 } from "./components/Article3.tsx";
import { CallOnScrollEnter } from "./components/CallOnScrollEnter.tsx";
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
        <section id="ethos">
          <Article1 />
          <Article2 />
          <Article3 />
        </section>
      </CallOnScrollEnter>
    </main>
  );
}