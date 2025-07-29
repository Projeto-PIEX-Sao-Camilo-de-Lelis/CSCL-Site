import { useNavigate } from "react-router-dom";
import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import DashboardPostList from "./posts/DashBoardPostList";
import VisitorStats from "./trackers/VisitorStats";
import { Plus, BarChart3, FileText } from "lucide-react";

export default function DashBoardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-secondary">
      <Menu />

      <div className="relative w-full bg-gradient-to-br from-main via-main/95 to-red-800 text-whiteColor overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">PAINEL ADMINISTRATIVO</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Dashboard de <span className="text-yellow-400">Gerenciamento</span>
            </h1>

            <p className="text-md md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Gerencie postagens do blog e acompanhe as estatísticas de visitação do site da Casa
              São Camilo de Lelis.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary transform -skew-y-1 origin-bottom-left"></div>
      </div>

      <div className="flex-1 bg-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border-b border-zinc-700/50 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Gerenciar Postagens</h2>
                      <p className="text-gray-400">Crie, edite e gerencie as postagens do blog</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/create-post")}
                    className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Nova Postagem
                  </button>
                </div>
              </div>

              <div className="p-6">
                <DashboardPostList />
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-500/20 border-b border-zinc-700/50 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Estatísticas do Site</h2>
                    <p className="text-gray-400">Acompanhe o desempenho e visitação</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <VisitorStats />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
