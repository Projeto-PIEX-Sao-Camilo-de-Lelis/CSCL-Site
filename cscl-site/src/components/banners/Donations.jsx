export default function Donations() {
  return (
    <div
      className="flex flex-row items-center justify-around w-full max-w-screen min-h-[50vh] bg-main text-whiteColor p-[1.5rem] gap-[2.5rem]"
      id="donations"
    >
      <div className="flex flex-col items-center justify-center text-center font-bold gap-[1rem] w-full md:w-1/2">
        <h1 className="text-[2rem]">
          Ajude a transformar vidas com a sua doação!
        </h1>
        <p className="hidden md:flex">
          Acesse o App da sua instituição financeira e faça a leitura do QR Code
          ao lado e participe dessa causa solidária. Você também pode realizar
          depósitos, pix ou transferência para a conta abaixo:
        </p>
        <p className="md:hidden">
          Realize uma doação para a conta abaixo e participe dessa causa
          solidária:
        </p>
        <p>Banco do Brasil - Agência: 2995-5</p>
        <p>Conta Corrente: 177.181-7</p>
        <p>CNPJ: 17.143.512/0001-00</p>
      </div>
      <div className="hidden md:flex ">
        <img
          alt="QR Code para doação via Pix"
          src="/assets/img/pix.png"
          className="w-[15rem]"
        />
      </div>
    </div>
  );
}
