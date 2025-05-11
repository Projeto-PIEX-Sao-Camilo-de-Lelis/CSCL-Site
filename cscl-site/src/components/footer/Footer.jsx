export default function Footer() {
  return (
    <div className="flex flex-col gap-[1rem] justify-center items-center w-full h-[25vh] text-[0.9rem] bg-main text-whiteColor">
      <div className="flex flex-row w-[85vw] justify-between items-center border-b-2 border-secondary  p-[0.7rem]">
        <img
          src="assets/icons/logo.png"
          alt="logo da Casa São Camillo de Lelis"
          className="w-[8rem]"
        />
        <p className=" hidden sm:block">
          Nosso compromisso é oferecer acolhimento integral às pessoas em
          situação de rua, promovendo dignidade e cidadania por meio de ações.
        </p>
        <nav className="flex flex-col gap-[0.4rem]">
          <a
            className="hover:underline decoration-secondary underline-offset-4 cursor-pointer"
            href="#about"
          >
            Sobre Nós
          </a>
          <a
            className="hover:underline decoration-secondary underline-offset-4 cursor-pointer"
            href="#cards"
          >
            Programas
          </a>
          <a
            className="hover:underline decoration-secondary underline-offset-4 cursor-pointer"
            href="#stories"
          >
            Nossas Histórias
          </a>
          <a
            className="hover:underline decoration-secondary underline-offset-4 cursor-pointer"
            href="#donations"
          >
            Doar Agora
          </a>
        </nav>
      </div>
      <div>
        <p>teste</p>
      </div>
    </div>
  );
}
