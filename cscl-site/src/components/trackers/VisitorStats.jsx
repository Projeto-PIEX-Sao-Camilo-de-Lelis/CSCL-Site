import { useEffect, useState } from "react";
import {
  getVisitorCount,
  getVisitorsByCountry,
  getVisitorsByDate,
} from "../../services/visitorAnalyticsService";
import VisitorChart from "./VisitorChart";

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
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg flex justify-center items-center text-whiteColor">
        <div className="animate-pulse">Carregando estatísticas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg text-whiteColor">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gradient-to-t from-red-800 via-zinc-900 to-zinc-900 rounded-lg shadow-lg text-whiteColor">
      <h2 className="text-xl font-bold mb-4 text-red-400 border-b border-red-500 pb-1">
        Contador de Visitantes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-gray-300">Total de Visitantes</h3>
          <p className="text-3xl font-bold text-red-400">{visitorCount.toLocaleString("pt-BR")}</p>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-gray-300">Países de origem do tráfego</h3>

          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.country}</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-2 bg-red-400 rounded-full"
                      style={{
                        width: `${Math.max((item.count / topCountries[0].count) * 100, 20)}px`,
                      }}
                    ></div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Nenhum dado disponível</p>
          )}
        </div>
      </div>
      <VisitorChart />
    </div>
  );
}
