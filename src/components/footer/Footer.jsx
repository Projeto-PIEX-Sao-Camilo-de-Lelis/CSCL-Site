import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const address = "Rua José Nunes Leal, n° 42, Santa Luzia 36030-230 Juiz de Fora, MG, Brazil";

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(address)}`, "_blank");
  };

  return (
    <footer className="w-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white rounded-full p-3 flex items-center justify-center w-16 h-16 shadow-lg">
                <img
                  src="/assets/icons/logo4.png"
                  alt="Logo da Casa São Camilo de Lelis"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Casa São Camilo de Lelis</h3>
                <p className="text-yellow-400 text-sm font-medium">Juiz de Fora - MG</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Nosso compromisso é oferecer acolhimento integral às pessoas em situação de rua,
              promovendo dignidade e cidadania por meio de ações transformadoras.
            </p>

            <div className="mb-6">
              <SocialMedia />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h4 className="text-xl font-bold mb-6 text-white flex items-center justify-center lg:justify-start gap-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Nossa Localização
            </h4>

            <div className="space-y-4 mb-6">
              <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="block font-medium text-white">Rua José Nunes Leal, n° 42</span>
                  <span className="block">Santa Luzia</span>
                  <span className="block">36030-230 Juiz de Fora, MG</span>
                </p>

                <button
                  onClick={openGoogleMaps}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Ver no Google Maps
                </button>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h4 className="text-xl font-bold mb-6 text-white flex items-center justify-center lg:justify-start gap-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Como Chegar
            </h4>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-2 overflow-hidden">
              {!mapLoaded ? (
                <div
                  className="w-full h-48 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:from-zinc-600 hover:to-zinc-700 transition-colors duration-300"
                  onClick={() => setMapLoaded(true)}
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-gray-300 text-sm font-medium">Clique para carregar o mapa</p>
                  <p className="text-gray-400 text-xs mt-1">OpenStreetMap</p>
                </div>
              ) : (
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-43.3600,-21.7700,-43.3400,-21.7500&layer=mapnik&marker=-21.7600,-43.3500"
                  width="100%"
                  height="192"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg"
                  title="Localização da Casa São Camilo de Lelis - OpenStreetMap"
                ></iframe>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={openGoogleMaps}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Google Maps
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.waze.com/live-map/directions?navigate=yes&to=ll.-21.7600%2C-43.3500",
                    "_blank"
                  )
                }
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-purple-500 hover:to-purple-400 transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.184 10.418c0 5.74-4.644 10.384-10.384 10.384S2.416 16.158 2.416 10.418 7.06.034 12.8.034s10.384 4.644 10.384 10.384zm-3.494 0c0-3.806-3.084-6.89-6.89-6.89s-6.89 3.084-6.89 6.89 3.084 6.89 6.89 6.89 6.89-3.084 6.89-6.89z" />
                </svg>
                Waze
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                &copy; 2025 Casa São Camilo de Lelis, Juiz de Fora.
              </p>
              <p className="text-gray-400 text-xs mt-1">Todos os direitos reservados.</p>
            </div>

            <Link
              to="https://github.com/Projeto-PIEX-Sao-Camilo-de-Lelis"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:border-yellow-400/50 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Desenvolvido no <span className="text-yellow-400 font-bold">PIEX</span>
                </p>
                <p className="text-xs text-gray-400">Instituto Vianna Júnior</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
