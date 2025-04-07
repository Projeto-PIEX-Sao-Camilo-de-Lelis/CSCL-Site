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
      <nav className="flex flex-row gap-[1rem] justify-center items-center">
        <a
          className="hover:underline decoration-[#A61A19] underline-offset-4 cursor-pointer"
          href="#about"
        >
          Sobre Nós
        </a>
        <a
          className="hover:underline decoration-[#A61A19] underline-offset-4 cursor-pointer"
          href="#cards"
        >
          Programas
        </a>
        <a
          className="hover:underline decoration-[#A61A19] underline-offset-4 cursor-pointer"
          href="#stories"
        >
          Nossas Histórias
        </a>
        <a
          className={` p-[1rem] rounded-[1.2rem] cursor-pointer`}
          style={{ backgroundColor: mainColor }}
          href="#donations"
        >
          DOAR AGORA
        </a>
      </nav>
    </div>
  );
}
