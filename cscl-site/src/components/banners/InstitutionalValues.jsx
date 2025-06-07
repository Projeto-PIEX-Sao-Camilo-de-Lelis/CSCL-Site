export default function InstitutionalValues() {
  return (
    <div className="w-full min-h-[100vh] md:min-h-[60vh] bg-main/95 text-whiteColor p-[1.5rem] flex items-center justify-center">
      <div className="flex flex-col gap-[1.5rem] items-center justify-center h-full w-full">
        <h1 className="text-[2rem] text-center">
          NOS AJUDE A TRANSFORMAR VIDAS
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-around h-full text-center gap-[1 rem] md:gap-[1.5 rem] w-full">
          <div className="flex flex-col md:gap-[1rem] items-center text-center min-h-[260px] justify-center w-full md:w-1/3">

            <h2 className="text-[1.5rem] text-center">MISSÃO</h2>
            <p className="text-center text">
              Oferecer acolhimento integral a pessoas em situação de rua,
              visando resgatar sua dignidade e cidadania por meio de assistência
              social, cuidados de saúde e reintegração social.
            </p>
          </div>

          <hr className="w-full border-t border-white my-4 md:hidden" />

          <div className="hidden md:block h-32 border-l-2 border-white mx-2"></div>
          <div className="flex flex-col md:gap-[1rem] items-center text-center min-h-[260px] justify-center w-full md:w-1/3">
            <h2 className="text-[1.5rem] text-center">VISÃO</h2>
            <p className="text-center">
              Ser uma referência no acolhimento de pessoas em situação de rua,
              promovendo uma sociedade justa e solidária, onde cada indivíduo
              tenha a oportunidade de reconstruir sua vida com dignidade.
            </p>
          </div>

          <hr className="w-full border-t border-white my-4 md:hidden" />

          <div className="hidden md:block h-32 border-l-2 border-white mx-2"></div>
          <div className="flex flex-col md:gap-[1rem] items-center text-center min-h-[260px] justify-center w-full md:w-1/3">
            <hr className="border-t border-white my-4 md:hidden" />
            <h2 className="text-[1.5rem] text-center">VALORES</h2>
            <p className="text-center">
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
