import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <div className="flex flex-col gap-[1rem] justify-center items-center w-full min-h-[25vh] text-[0.9rem] bg-main text-whiteColor">
      <div className="flex flex-col w-[85vw] justify-center items-center border-b-2 border-secondary  p-[0.7rem]">
        <SocialMedia />
        <p className=" hidden sm:block">
          Nosso compromisso é oferecer acolhimento integral às pessoas em
          situação de rua, promovendo dignidade e cidadania por meio de ações.
        </p>
      </div>
      <div>
        <p>2024@Desenvolvido por alunos do Instituto Vianna Júnior</p>
      </div>
      <div className="w-full min-h-[20vh] bg-secondary flex flex-row justify-center items-center">
        <img
          src="/assets/icons/logo3.png"
          alt="logo da Casa São Camillo de Lelis"
          className="w-[8rem]"
        />
      </div>
    </div>
  );
}
