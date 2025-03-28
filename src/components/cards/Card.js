import { useEffect, useState } from "react";
import "../../styles/card.css";

export default function Card({ titulo, paragrafo, img }) {
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
  });

  return (
    <div
      className="card"
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
            }
          : {
              transformStyle: "preserve-3d",
            }
      }
    >
      {ativo ? <p>{paragrafo}</p> : <h1>{titulo}</h1>}
    </div>
  );
}
