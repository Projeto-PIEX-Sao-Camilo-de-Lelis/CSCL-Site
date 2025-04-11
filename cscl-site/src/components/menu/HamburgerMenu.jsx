import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { UserContext } from "../../context/UserContext";

export default function HamburgerMenu() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden relative">
      {/* Botão hamburguer */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className=" absolute right-0 mt-2 w-[75vw] bg-secondary border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col gap-[1rem] p-2 space-y-2 justify-center items-center">
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
            {user != null && (
              <a
                className=" font-light text-gray-300 mr-[0.5rem] cursor-pointer"
                dir="rtl"
              >
                Deslogar
              </a>
            )}
            {user == null && (
              <a
                className=" font-light text-gray-300 mr-[0.5rem] cursor-pointer"
                dir="rtl"
              >
                Login
              </a>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
