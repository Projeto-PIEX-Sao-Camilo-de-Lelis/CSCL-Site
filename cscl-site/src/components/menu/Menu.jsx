import { useContext } from "react";
import "../../index.css";
import { UserContext } from "../../context/UserContext";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate, Link, useLocation } from "react-router-dom";


export default function Menu() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div
      className={`flex items-center justify-between w-full min-h-[15vh] md:min-h-[20vh] bg-secondary text-whiteColor font-bold px-4`}
    >
      <div className="flex items-center gap-2">
        <img
          src="/assets/icons/logo3.png"
          alt="logo da Casa São Camillo de Lelis"
          className="w-15 h-15 md:w-30 md:h-30 object-contain"
        />
        <h1 className="text-[1.2rem] md:text-4xl">Casa Camilo de Lelis</h1>
      </div>

      <div className="flex md:hidden">
        <HamburgerMenu />
      </div>

      <nav className="hidden md:flex items-center gap-4 ">
        {isHome ? (
          <>
            <Link
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              to="/blog"
            >
              Blog
            </Link>
            <a
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              href="#about"
            >
              Sobre Nós
            </a>
            <a
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              href="#cards"
            >
              Programas
            </a>
            <a
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              href="#stories"
            >
              Nossas Histórias
            </a>
            <a
              className="p-[0.5rem] rounded-[1.2rem] cursor-pointer bg-main"
              href="#donations"
            >
              DOAR AGORA
            </a>
          </>
        ) : (
          <>
            <Link
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:underline decoration-main underline-offset-4 cursor-pointer"
              to="/blog"
            >
              Blog
            </Link>
          </>
        )}
        {location.pathname !== "/" && user != null && (
          <Link
            className="hover:underline decoration-main underline-offset-4 cursor-pointer"
            to="/dashboard"
          >
            Gerenciar Postagens
          </Link>
        )}

        {user != null && (
          <a
            className="hidden md:block absolute start-0 top-0 font-light text-gray-300 mr-[0.6rem] cursor-pointer"
            dir="rtl"
            onClick={logout}
          >
            deslogar
          </a>
        )}
        {user == null && (
          <a
            className="hidden md:block absolute start-0 top-0 font-light text-gray-300 mr-[0.6rem] cursor-pointer"
            dir="rtl"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </a>
        )}
      </nav>
    </div>
  );
}
