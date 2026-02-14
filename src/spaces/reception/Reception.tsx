import officeFlex from "./images/office-flex.jpg";
import officeSelfie from "./images/office-selfie.jpg";
import napoleonPainting from "./images/napoleon-in-his-study.jpeg";
import { ThreeFourAspectRatio } from "../../components/ThreeFourAspectRatio.tsx";

export default function Reception() {
  return (
    <section className="grid grid-cols-3 relative">
      <img src={officeFlex} alt="boy in office doing front double biceps" />
      <header className="absolute">
        <h1>Ariel Robert Mutebi</h1>
        <h2>At AR Mutebi LLC</h2>
      </header>
      <img src={officeSelfie} alt="selfie of a boy in a dressing shirt and vest" />
      <ThreeFourAspectRatio>
        <img src={napoleonPainting} alt="Painting: Emperor Napoleon in his study" />
      </ThreeFourAspectRatio>
    </section>
  );
}