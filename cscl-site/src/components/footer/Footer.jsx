import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <div className="flex flex-col gap-[1rem] justify-center items-center w-full min-h-[25vh] text-[0.9rem] bg-main/95 text-whiteColor">
      <div className="flex flex-col w-[85vw] justify-center items-center border-b-2 border-secondary  p-[0.7rem]">
        <div className="mb-4">
          <SocialMedia />
        </div>
        <p className="hidden sm:block">
          Nosso compromisso é oferecer acolhimento integral às pessoas em
          situação de rua, promovendo dignidade e cidadania por meio de ações.
        </p>
      </div>
      <div>
        <p>2024@Desenvolvido por alunos do Instituto Vianna Júnior</p>
      </div>
      <div className="w-full min-h-[15vh] flex flex-row justify-center items-center">
        <div className="bg-white rounded-full p-2 flex items-center justify-center w-10 h-10 md:w-20 md:h-20">
          <img
            src="/assets/icons/logo4.png"
            alt="logo da Casa São Camillo de Lelis"
            className="w-15 h-15 md:w-25 md:h-25 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
