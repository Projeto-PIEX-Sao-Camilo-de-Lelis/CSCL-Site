import { useEffect, useState } from "react";
import {
  getVisitorCount,
  getVisitorsByCountry,
  getVisitorsByDate,
} from "../../services/visitorAnalyticsService";
import VisitorChart from "./VisitorChart";
import { Users, Globe, TrendingUp, BarChart, AlertCircle } from "lucide-react";

export default function VisitorStats() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [topCountries, setTopCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        setIsLoading(true);

        const count = await getVisitorCount();
        setVisitorCount(count);

        const countriesData = await getVisitorsByCountry();

        const countriesArray = Object.entries(countriesData)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setTopCountries(countriesArray);

        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar estatísticas:", err);
        setError("Não foi possível carregar as estatísticas de visitantes.");
        setIsLoading(false);
      }
    };

    fetchVisitorStats();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div>
            <p className="text-white text-lg">Carregando estatísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 border border-red-700/50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Erro ao Carregar</h3>
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-xl p-6 group hover:border-blue-500/70 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Total de Visitantes</h3>
              <p className="text-blue-200/70 text-sm">Todos os acessos registrados</p>
            </div>
          </div>

          <div className="relative">
            <p className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
              {visitorCount.toLocaleString("pt-BR")}
            </p>
            <div className="flex items-center gap-2 text-blue-200/70 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Total acumulado</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/50 rounded-xl p-6 group hover:border-purple-500/70 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Países de Origem</h3>
              <p className="text-purple-200/70 text-sm">Top 5 países com mais acessos</p>
            </div>
          </div>

          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.map((item, index) => (
                <div key={index} className="group/item">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{item.country}</span>
                    <span className="text-purple-300 text-sm font-semibold">{item.count}</span>
                  </div>
                  <div className="w-full bg-purple-900/30 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500 ease-out group-hover/item:from-purple-400 group-hover/item:to-purple-300"
                      style={{
                        width: `${Math.max((item.count / topCountries[0].count) * 100, 15)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Globe className="w-8 h-8 text-purple-400/50 mx-auto mb-2" />
              <p className="text-purple-200/50 text-sm">Nenhum dado disponível</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-green-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <BarChart className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Gráfico de Visitação</h3>
              <p className="text-green-200/70">Visualização temporal dos acessos</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <VisitorChart />
        </div>
      </div>
    </div>
  );
}
