import { useContext } from "react";
import "../../index.css";
import { UserContext } from "../../context/UserContext";
import HamburgerMenu from "./HamburgerMenu";

export default function Menu() {
  const { user } = useContext(UserContext);

  return (
    <div
      className={`flex flex-row w-full max-w-screen min-h-[15vh] justify-between items-center font-bold p-[1rem] bg-secondary text-whiteColor`}
    >
      <div className="flex flex-row gap-[0.5rem] justify-start items-center">
        <img
          src="assets/icons/logo2.png"
          alt="logo da Casa São Camillo de Lelis"
          className="w-1/5 h-1/2"
        />
        <h1 className="text-[1.2rem]">Casa Camilo de Lelis</h1>
      </div>
      <HamburgerMenu />
      <nav className=" flex-row gap-[1rem] justify-center items-center hidden md:flex">
        {user != null && (
          <a
            className="hover:underline decoration-main underline-offset-4 cursor-pointer"
            href="#about"
          >
            Gerenciar Postagens
          </a>
        )}
        <a
          className="hover:underline decoration-main underline-offset-4 cursor-pointer"
          href="#about"
        >
          Sobre Nós
        </a>
        <a
          className="hover:underline decoration-main underline-offset-4 cursor-pointer"
          href="#cards"
        >
          Programas
        </a>
        <a
          className="hover:underline decoration-main underline-offset-4 cursor-pointer"
          href="#stories"
        >
          Nossas Histórias
        </a>
        <a
          className={` p-[1rem] rounded-[1.2rem] cursor-pointer bg-main`}
          href="#donations"
        >
          DOAR AGORA
        </a>
      </nav>
      <a
        className="hidden md:block absolute start-0 top-0 font-light text-gray-300 mr-[0.5rem] cursor-pointer"
        dir="rtl"
      >
        Login
      </a>
    </div>
  );
}
