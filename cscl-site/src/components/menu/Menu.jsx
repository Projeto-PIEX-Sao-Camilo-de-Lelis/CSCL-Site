import { mainColor, secondaryColor, whiteColor } from "../../config/Colors";
import "../../index.css";

export default function Menu() {
  return (
    <div
      className={`flex flex-row w-full max-w-screen min-h-[15vh] justify-start items-center font-bold p-[1rem]`}
      style={{ backgroundColor: secondaryColor, color: whiteColor }}
    >
      <div className="mr-auto flex flex-row gap-[1rem] justify-start items-center">
        <img
          src="assets/icons/logo.png"
          alt="logo da Casa São Camillo de Lelis"
          className="max-w-1/5"
        />
        <h1 className="text-[1.5rem]">Casa Camilo de Lelis</h1>
      </div>
      <ul className="flex flex-row gap-[1rem] justify-center items-center">
        <li>Sobre Nós</li>
        <li>Programas</li>
        <li>Sobre Nós</li>
        <li>Nossas Histórias</li>
        <a className={`bg-["${mainColor}"]`}>DOAR AGORA</a>
      </ul>
    </div>
  );
}
