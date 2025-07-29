import { useContext, useEffect, useState } from "react";
import "../../index.css";
import { UserContext } from "../../context/UserContext";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Menu() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonationClick = (e) => {
    if (isHome) {
      e.preventDefault();
      const donationsSection = document.getElementById("donations");
      if (donationsSection) {
        donationsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-zinc-900/95 backdrop-blur-xl shadow-2xl border-b border-zinc-700/50"
            : "bg-zinc-900/90 backdrop-blur-md"
        }
      `}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="group flex items-center gap-3 lg:gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-white rounded-full p-2 lg:p-3 flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 shadow-xl border border-gray-200 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                <img
                  src="/assets/icons/logo4.png"
                  alt="Logo da Casa São Camilo de Lelis"
                  className="w-12 h-12 lg:w-14 lg:h-14 object-cover"
                />
              </div>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg lg:text-xl group-hover:text-red-400 transition-colors duration-300">
                Casa São Camilo
              </h1>
              <p className="text-gray-400 text-xs lg:text-sm font-medium">de Lelis</p>
            </div>
          </Link>

          <div className="flex md:hidden">
            <HamburgerMenu />
          </div>

          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 lg:gap-2">
              {isHome ? (
                <>
                  <Link
                    to="/blog"
                    className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    Blog
                  </Link>
                  <a
                    href="#about"
                    className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    Sobre Nós
                  </a>
                  <a
                    href="#cards"
                    className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    Programas
                  </a>
                  <a
                    href="#stories"
                    className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    Histórias
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/blog"
                    className={`px-4 py-2 text-sm lg:text-base rounded-lg transition-all duration-300 font-medium ${
                      location.pathname === "/blog" || location.pathname.startsWith("/blog/")
                        ? "text-yellow-400 bg-yellow-400/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Blog
                  </Link>
                </>
              )}

              {location.pathname !== "/" && user != null && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 font-medium"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/#donations"
                onClick={handleDonationClick}
                className="ml-2 lg:ml-4 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-sm lg:text-base font-bold hover:from-red-500 hover:to-red-400 transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                DOAR
              </Link>
            </div>

            <div className="ml-4 lg:ml-6 flex items-center gap-2">
              {user != null ? (
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-1">
                      <span className="text-gray-300 text-sm font-medium">Logado</span>
                    </Link>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg transition-all duration-300 font-medium"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm bg-zinc-800/50 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300 font-medium border border-zinc-700/50 hover:border-zinc-600/50"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
    </header>
  );
}
