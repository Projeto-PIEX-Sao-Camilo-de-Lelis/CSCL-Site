export default function InstitutionalValues() {
  return (
    <div className="w-full min-h-[80vh] md:min-h-[33vh] bg-main text-whiteColor p-[1.5rem]">
      <div className="flex flex-col gap-[1.5rem] items-center justify-center h-full  w-full">
        <h1 className="text-[2rem] text-center">
          NOS AJUDE A TRANSFORMAR VIDAS
        </h1>
        <div className=" flex flex-col md:flex-row items-center justify-around h-full text-center md:text-justify gap-[3rem]">
          <div className="flex flex-col md:gap-[1rem]">
            <hr className="border-t border-black my-4 md:hidden" />
            <h2 className="text-[1.5rem] md:text-center">MISSÃO</h2>
            <p>
              Oferecer acolhimento integral a pessoas em situação de rua,
              visando resgatar sua dignidade e cidadania por meio de assistência
              social, cuidados de saúde e reintegração social.
            </p>
          </div>
          <div className="flex flex-col md:gap-[1rem]">
            <hr className="border-t border-black my-4 md:hidden" />
            <h2 className="text-[1.5rem] md:text-center">VISÃO</h2>
            <p>
              Ser uma referência no acolhimento de pessoas em situação de rua,
              promovendo uma sociedade justa e solidária, onde cada indivíduo
              tenha a oportunidade de reconstruir sua vida com dignidade.
            </p>
          </div>
          <div className="flex flex-col md:gap-[1rem]">
            <hr className="border-t border-black my-4 md:hidden" />
            <h2 className="text-[1.5rem] md:text-center">VALORES</h2>
            <p>
              A Casa, com foco no amor ao próximo e no respeito à
              individualidade de cada um, busca proporcionar uma vida digna a
              todos os Acolhidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
