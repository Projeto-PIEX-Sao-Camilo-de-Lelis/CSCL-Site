import Btn from "./components/base/btn";
import InfoDoacoes from "./components/doacoes/InfoDoacoes";
import NossasHistorias from "./components/historias/NossasHistorias";
import Menu from "./components/menu/Menu";
import SobreNos from "./components/SobreNos/SobreNos";
import NossosValores from "./components/valores/NossosValores";
import "./styles/styles.css";
import Cards from "./components/cards/CardsDesktop";
import Footer from "./components/footer/Footer";
import CardsMobile from "./components/cards/CardsMobile";
import Principal from "./components/principal/Principal";

export default function App() {
  const handleNav = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsApp = (phoneNumber, message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <Menu />
      <Principal />
      <InfoDoacoes />
      <SobreNos />
      <NossosValores />
      <Cards />
      <NossasHistorias />
      <div className="side-menu">
        <Btn action={handleNav} alt="teste" logo="/icons/arrow.png" />
        <Btn
          action={() => handleWhatsApp("553232341676", "Olá, gostaria de mais informações!")}
          alt="WhatsApp"
          logo="/icons/WhatsApp.webp"
        />
      </div>
      <CardsMobile />
      <Footer />
    </div>
  );
}
