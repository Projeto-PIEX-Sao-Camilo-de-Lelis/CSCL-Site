import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full min-h-[10vh] text-[0.9rem] bg-main/95 text-whiteColor">
      <div className="flex flex-col w-[85vw] justify-center items-center border-b-2 border-secondary p-2">
        <div className="mb-2">
          <SocialMedia />
        </div>
        <p className="hidden sm:block text-center">
          Nosso compromisso é oferecer acolhimento integral às pessoas em situação de rua,
          promovendo dignidade e cidadania por meio de ações.
        </p>
      </div>
      <div className="w-full min-h-[6vh] flex flex-col justify-center items-center gap-1">
        <p>&copy; 2025 Casa São Camilo de Lelis, Juiz de Fora.</p>
        <Link to="https://github.com/Projeto-PIEX-Sao-Camilo-de-Lelis">
          <p className="text-center text-sm">
            Site desenvolvido no <strong>PIEX</strong> do Instituto Vianna Júnior.
          </p>
        </Link>
      </div>
      <div className="w-full min-h-[6vh] flex flex-row justify-center items-center">
        <div className="bg-white rounded-full p-1 flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
          <img
            src="/assets/icons/logo4.png"
            alt="Logo da Casa São Camillo de Lelis"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
