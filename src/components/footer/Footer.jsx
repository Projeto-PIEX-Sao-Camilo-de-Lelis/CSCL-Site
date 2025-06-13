import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full min-h-[10vh] text-[0.9rem] bg-main/95 text-whiteColor">
      <div className="flex flex-col w-[85vw] justify-center items-center border-b-2 border-secondary p-2">
        <div className="mb-2">
          <SocialMedia />
        </div>
        <p className="hidden sm:block text-center">
          Nosso compromisso é oferecer acolhimento integral às pessoas em
          situação de rua, promovendo dignidade e cidadania por meio de ações.
        </p>
      </div>
      <div>
        <p>2024@Desenvolvido por alunos do Instituto Vianna Júnior</p>
      </div>
      <div className="w-full min-h-[6vh] flex flex-row justify-center items-center">
        <div className="bg-white rounded-full p-1 flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
          <img
            src="/assets/icons/logo4.png"
            alt="logo da Casa São Camillo de Lelis"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
