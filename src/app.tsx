import { useState } from "react";
import { Reception } from "./components/Reception.tsx";
import { Story } from "./components/Story.tsx";

export interface SectionProps {
  passTheBatonForward: () => void;
  passTheBatonBackward: () => void;
}

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const passTheBatonForward = () => setActiveSection(i => i + 1);
  const passTheBatonBackward = () => setActiveSection(i => i -1 );
  const sectionProps: SectionProps = { passTheBatonForward, passTheBatonBackward };

  const sections = [
    <Reception key="reception" {...sectionProps} />,
    <Story key="story" />,
  ];

  return sections[activeSection];
}
