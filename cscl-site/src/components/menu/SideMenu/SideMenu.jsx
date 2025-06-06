import Btn from "./Btn";

export default function SideMenu() {
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
    <div className="flex flex-col fixed bottom-0 right-0 m-2 z-100 gap-[0.4rem]">
      <Btn
        alt="subir para o topo da página"
        icon="/assets/icons/arrow.png"
        onClick={handleNav}
      />
      <Btn
        alt="Whatsapp"
        icon="/assets/icons/WhatsApp.webp"
        onClick={() =>
          handleWhatsApp("553232341676", "Olá, gostaria de mais informações!")
        }
      />
    </div>
  );
}
