export default function Nav() {
  const handleNavSobreNos = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="nav">
      <a className="btn" href="#sobre">
        Sobre Nós
      </a>
      <a className="btn" href="#programas">
        Programas
      </a>
      <a className="btn" href="#historias">
        Nossas Histórias
      </a>
      <a className="btn-doar" href="#doar">
        DOAR AGORA
      </a>
    </div>
  );
}
