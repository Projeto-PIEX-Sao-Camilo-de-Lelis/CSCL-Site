import Donations from "./banners/Donations";
import InstitutionalValues from "./banners/InstitutionalValues";
import Footer from "./footer/Footer";
import About from "./main/About";
import Cards from "./main/Cards";
import Stories from "./main/Stories";
import Menu from "./menu/Menu";

export default function MainPage() {
  return (
      <div className="flex flex-col w-full overflow-x-hidden md:text-2x1">
        <Menu />
        <Donations />
        <About />
        <InstitutionalValues />
        <Cards />
        <Stories />
        <Footer />
      </div>
  );
}
