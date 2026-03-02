import type { ReactElement } from "react";
import { Article1 } from "./components/Article1.tsx";
import { Article2 } from "./components/Article2.tsx";
import { Article3 } from "./components/Article3.tsx";
import { Article4 } from "./components/Article4.tsx";
import { Article5 } from "./components/Article5.tsx";
import { UpdateHashOnEnter } from "./components/UpdateHashOnEnter.tsx";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";

export default function App() {
  const { hash, navigate } = useHashRoute("#reception");

  if (hash === "#reception") {
    return <Reception passTheBatonForward={() => navigate("story")} />;
  }

  const theRest: [string, ReactElement][] = [
    ["ethos-impressions", <Article1 />],
    ["ethos-work", <Article2 />],
    ["ethos-records", <Article3 />],
    ["ethos-world", <Article4 />],
    ["ethos-collaborate", <Article5 />]
  ];

  return (
    <main className="relative">
      <UpdateHashOnEnter hash="story" navigate={navigate}>
        <Story passTheBatonBack={() => navigate("reception")} />
      </UpdateHashOnEnter>
      {theRest.map(([hash, article]) => (
        <UpdateHashOnEnter hash={hash} navigate={navigate}>
          {article}
        </UpdateHashOnEnter>
      ))}
    </main>
  );
}
