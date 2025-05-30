export default function About() {
  return (
    <div
      className=" w-full min-h-[100vh]
        flex flex-col md:flex-row
        gap-[1.5rem] md:gap-[2rem]
        justify-center items-center
        bg-secondary
        p-[1.6rem] md:p[2rem]
        relative overflow-hidden

        after:content-['']
        after:absolute after:top-0 after:left-0
        after:w-screen after:h-full
        after:bg-black
        after:opacity-[0.80]
        after:mix-blend-multiply
        after:transition-all after:duration-300
        after:grayscale
        after:z-[1] "
      style={{ backgroundImage: `url(/assets/backgrounds/sobrenos.jpg` }}
      id="about"
    >
      <img
        src="assets/img/fotodetodos2023.jpg"
        alt=""
        className="md:w-1/2 md:p-[2rem] z-[10]"
      />
      <div className="flex flex-col gap-[1rem] justify-center items-center text-[1rem] md:p-[2.5rem] md:w-1/2 z-[10]">
        <h1 className="text-white text-[2rem] font-bold">Sobre Nós</h1>
        <p className="text-white text-justify md:text-[1rem]">
          Fundada em 16 de outubro de 1971, a Casa São Camilo de Lelis é uma
          Organização da Sociedade Civil (OSC) sem fins lucrativos, dedicada ao
          acolhimento de pessoas em situação de vulnerabilidade social,
          principalmente aquelas em situação de rua. Situada em Juiz de Fora -
          MG, a instituição opera desde sua fundação em um imóvel cedido pela
          Paróquia do bairro Santa Luzia, permanecendo fiel à sua missão de
          oferecer abrigo, dignidade e cidadania aos seus acolhidos.
        </p>
        <p className="text-white text-justify">
          Nossa missão é proporcionar acolhimento integral a pessoas em situação
          de rua, promovendo o resgate de sua dignidade e cidadania através de
          ações de assistência social, cuidados de saúde e reinserção na
          sociedade.
        </p>
        <p className="text-white text-justify">
          Oferecemos aos nossos acolhidos cinco refeições diárias, produtos de
          higiene pessoal e cuidados com a saúde, acompanhamento médico,
          odontológico e fioterápico, orientação social e assistência para
          recuperação de vínculos familiares. Além disso, nossa equipe de
          Serviço Social auxilia na obtenção de documentos, inclusão em
          programas de requalificação profissional e encaminhamentos para
          oportunidades de emprego.
        </p>
      </div>
    </div>
  );
}
