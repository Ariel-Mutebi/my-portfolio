import { TextReveal } from "./TextReveal.tsx";
import "./Ethos.css";

export function Ethos() {
  return (
    <section id="ethos">
      <article className="bg-lime-200 min-h-dvh relative">
        <h2 className="playfair-display text-8xl text-zinc-800 pt-8 pr-24 text-right z-10">
          The Ariel <span className="italic ethos-gradient tracking-wide">Ethos</span>
        </h2>
        <TextReveal
          text="Creating lasting first impressions of"
          className="ml-[20dvw] mt-8 text-4xl montserrat z-10"
          startColor="#ecfccb"
          endColor="#52525b"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="montserrat text-6xl mt-8 font-bold text-center">confidence</p>
        </div>
      </article>
    </section>
  );
}
