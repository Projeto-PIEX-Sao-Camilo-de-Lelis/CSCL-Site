import { useEffect, useState } from "react";

export default function FooterNav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="footer-list">
      <dl>
        <li>
          <a className="btn" href="#sobre">
            Sobre nós
          </a>
        </li>
        {isMobile ? (
          <li>
            <a className="btn" href="#programas-mobile">
              Programas
            </a>
          </li>
        ) : (
          <li>
            <a className="btn" href="#programas">
              Programas
            </a>
          </li>
        )}
        <li>
          <a className="btn" href="#historias">
            Nossas Histórias
          </a>
        </li>
        <li>
          <a className="btn" href="#doar">
            Doe Agora
          </a>
        </li>
      </dl>
    </div>
  );
}
