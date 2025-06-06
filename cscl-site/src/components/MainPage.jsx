import Donations from "./banners/Donations";
import InstitutionalValues from "./banners/InstitutionalValues";
import Footer from "./footer/Footer";
import About from "./main/About";
import Cards from "./main/Cards";
import Stories from "./main/Stories";
import Menu from "./menu/Menu";
import SideMenu from "./menu/SideMenu/SideMenu";

export default function MainPage() {
  return (
    <div className="flex flex-col w-full h-full overflow-x-hidden md:text-2x1 overflow-hidden">
      <Menu />
      <SideMenu />
      <Donations />
      <About />
      <InstitutionalValues />
      <Cards />
      <Stories />
      <Footer />
    </div>
  );
}
