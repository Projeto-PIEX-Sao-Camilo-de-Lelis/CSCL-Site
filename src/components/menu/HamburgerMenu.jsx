import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function HamburgerMenu() {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleAnchorClick = (anchor) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-zinc-900 border-l border-zinc-700/50 z-[58] transform transition-transform duration-300 shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-zinc-700/50 bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full p-2 flex items-center justify-center">
                <img
                  src="/assets/icons/logo4.png"
                  alt="Logo da Casa São Camilo de Lelis"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Casa São Camilo</h3>
                <p className="text-gray-400 text-xs">de Lelis</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-4 bg-zinc-900">
            {isHome ? (
              <>
                <button
                  onClick={() => handleNavigate("/blog")}
                  className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="font-medium">Blog</span>
                </button>

                <button
                  onClick={() => handleAnchorClick("#about")}
                  className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Sobre Nós</span>
                </button>

                <button
                  onClick={() => handleAnchorClick("#cards")}
                  className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="font-medium">Programas</span>
                </button>

                <button
                  onClick={() => handleAnchorClick("#stories")}
                  className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="font-medium">Histórias</span>
                </button>

                <div className="border-t border-zinc-700/50 my-2"></div>

                {user != null ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-800/80 rounded-lg">
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
                      <span className="text-gray-300 text-sm font-medium">Logado como Admin</span>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Sair</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Login</span>
                  </button>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => handleAnchorClick("#donations")}
                    className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    DOAR
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="font-medium">Home</span>
                </button>

                <button
                  onClick={() => handleNavigate("/blog")}
                  className={`flex items-center gap-3 p-3 text-left rounded-lg transition-all duration-300 ${
                    location.pathname === "/blog" || location.pathname.startsWith("/blog/")
                      ? "text-yellow-400 bg-yellow-400/20"
                      : "text-gray-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="font-medium">Blog</span>
                </button>

                {user != null && (
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                  </button>
                )}

                <div className="border-t border-zinc-700/50 my-2"></div>

                {user != null ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-800/80 rounded-lg">
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
                      <span className="text-gray-300 text-sm font-medium">Logado como Admin</span>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Sair</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Login</span>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-700/50 bg-zinc-900">
            <div className="text-center">
              <p className="text-gray-400 text-xs">© 2025 Casa São Camilo de Lelis</p>
              <p className="text-gray-500 text-xs mt-1">Juiz de Fora - MG</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
