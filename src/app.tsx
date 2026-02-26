import type { FC } from "react";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";

interface MainProps {
  passTheBatonBackward: () => void;
}

const Main: FC<MainProps> = ({ passTheBatonBackward }) => {
  // TODO: button to pass the baton backward (scroll up to go back gave terrible UX)

  return (
    <main>
      <Story />
    </main>
  );
}

export default function App() {
  const { hash, navigate } = useHashRoute("#reception");
  const passTheBatonForward = () => navigate("#story");
  const passTheBatonBackward = () => navigate("#reception");

  return hash === "#reception" ?
    <Reception passTheBatonForward={passTheBatonForward} /> :
    <Main passTheBatonBackward={passTheBatonBackward} />;
}