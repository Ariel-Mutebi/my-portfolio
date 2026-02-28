import { TextReveal } from "./TextReveal.tsx";
import seatedPortrait from "./images/seated-portrait.jpg";
import "./Ethos.css";

export function Ethos() {
  return (
    <section id="ethos">
      <article className="bg-lime-200 h-dvh relative flex flex-col">
        <h2 className="playfair-display text-8xl text-zinc-800 pt-8 pr-24 text-right z-10 relative">
          The Ariel <span className="italic ethos-gradient tracking-wide">Ethos</span>
        </h2>
        <TextReveal
          text="Creating lasting first impressions of"
          className="ml-[20dvw] my-8 text-4xl montserrat z-10 relative"
          startColor="hsl(80.7 90% 79%)" // lime-200
          endColor="hsl(240.13 6% 34%)" // zinc-600
        />
        <div className="grow min-h-0">
          <img src={seatedPortrait} className="h-full w-full object-cover object-center" alt="Ariel seated" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="montserrat text-6xl font-bold text-center mix-blend-difference text-white">confidence</p>
        </div>
      </article>
    </section>
  );
}
