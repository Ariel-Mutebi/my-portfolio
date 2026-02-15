import officeFlex from "./images/office-flex.jpg";
import officeSelfie from "./images/office-selfie.jpg";
import napoleonPainting from "./images/napoleon-in-his-study.jpeg";

export default function Reception() {
  return (
    <div className="h-dvh max-h-dvh flex items-center justify-center">
      <section className="grid grid-cols-3 relative gap-4 m-8">
        <img src={officeFlex} className="max-h-[80dvh]" alt="boy in office doing front double biceps" />
        <header className="absolute">
          <h1>Ariel Robert Mutebi</h1>
          <h2>At AR Mutebi LLC</h2>
        </header>
        <img src={officeSelfie} className="max-h-[80dvh]" alt="selfie of a boy in a dressing shirt and vest" />
        <div className="aspect-3/4 overflow-hidden max-h-[80dvh]">
          <img src={napoleonPainting} alt="Oil painting: Emperor Napoleon in his study" />
        </div>
      </section>
    </div>
  );
}