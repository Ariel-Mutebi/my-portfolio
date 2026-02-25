import { useState, type FC } from "react";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useTopBoundaryIntent } from "./hooks/useTopBoundaryIntent.ts";

interface MainProps {
  passTheBatonBackward: () => void;
}

const Main: FC<MainProps> = ({ passTheBatonBackward }) => {
  useTopBoundaryIntent(passTheBatonBackward);

  return (
    <main>
      <Story />
    </main>
  );
}

export default function App() {
  const [isReception, setIsReception] = useState(true);

  const passTheBatonForward = () => setIsReception(false);
  const passTheBatonBackward = () => setIsReception(true);

  return isReception ?
    <Reception passTheBatonForward={passTheBatonForward} /> :
    <Main passTheBatonBackward={passTheBatonBackward} />;
}