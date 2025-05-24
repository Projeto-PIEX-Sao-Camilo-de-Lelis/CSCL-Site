import { useEffect, useState } from "react";

export default function Card({ title, para, img }) {
  const [ativo, setAtivo] = useState(false);
  const [ePraGirar, setEPraGirar] = useState(false);

  useEffect(() => {
    if (ativo) {
      setTimeout(() => {
        setEPraGirar(true);
      }, 500);
    } else {
      setEPraGirar(false);
    }
  }, [ativo]);

  return (
    <div
      className={`w-[30vw] min-h-[40vh] text-whiteColor flex align-center justify-center p-[1rem] mb-[1rem] mt-[1rem] bg-cover bg-center bg-no-repeat position-relative overflow-hidden perspective-[1000px] shadow-xl after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#a61a19] after:opacity-[0.99] after:mix-blend-multiply after:transition-all after:duration-300 after:z-[1]`}
      onMouseEnter={() => {
        setAtivo(true);
      }}
      onMouseLeave={() => {
        setAtivo(false);
      }}
      style={
        ePraGirar
          ? {
              transform: "rotateX(360deg)",
              transformStyle: "flat",
              transition: "none",
              backgroundImage: `url(/assets/img/${img})`,
            }
          : {
              transformStyle: "preserve-3d",
              backgroundImage: `url(/assets/img/${img})`,
            }
      }
    >
      <div className="z-10 flex flex-col items-center justify-center h-full w-full text-center">
        {ativo ? (
          <p className="w-full">{para}</p>
        ) : (
          <h1 className="w-full">{title}</h1>
        )}
      </div>
    </div>
  );
}
