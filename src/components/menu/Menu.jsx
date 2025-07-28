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
      className={`flex items-center justify-between w-full min-h-[10vh] md:min-h-[12vh] bg-secondary text-whiteColor font-bold px-4`}
    >
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full p-1 flex items-center justify-center w-10 h-10 md:w-16 md:h-16 shadow-lg border border-gray-200">
            <img
              src="/assets/icons/logo4.png"
              alt="Logo da Casa São Camillo de Lelis"
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
            />
          </div>

          <h1 className="text-[1rem] md:text-3xl">Casa Camilo de Lelis</h1>
        </div>
      </Link>

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
            <a className="p-[0.5rem] rounded-[1.2rem] cursor-pointer bg-main" href="#donations">
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
