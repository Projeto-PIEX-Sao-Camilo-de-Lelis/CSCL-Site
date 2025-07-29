import { useState, useEffect } from "react";
import { getVisitorsByDate } from "../../services/visitorAnalyticsService";
import { Calendar, TrendingUp, Activity } from "lucide-react";

export default function VisitorChart() {
  const [visitData, setVisitData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const now = new Date();
        const endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];

        const data = await getVisitorsByDate(formattedStartDate, formattedEndDate);
        const processedData = [];

        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);

          const dateKey = currentDate.toISOString().split("T")[0];
          const label = currentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          });

          const count = data[dateKey] || 0;

          processedData.push({
            date: dateKey,
            count: count,
            label: label,
          });
        }

        setVisitData(processedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados de visitas por data:", err);
        setError("Não foi possível carregar os dados do gráfico");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
          <p className="text-green-200 text-sm">Carregando gráfico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-green-400/50 mx-auto mb-3" />
          <p className="text-green-200/70">{error}</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...visitData.map((d) => d.count), 1);
  const totalVisits = visitData.reduce((sum, day) => sum + day.count, 0);
  const avgVisits = Math.round(totalVisits / 7);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-800/30 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-200 text-sm font-medium">Total (7 dias)</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{totalVisits}</p>
        </div>

        <div className="bg-green-800/30 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-green-200 text-sm font-medium">Média Diária</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{avgVisits}</p>
        </div>

        <div className="bg-green-800/30 border border-green-700/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-green-200 text-sm font-medium">Pico Diário</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{maxValue}</p>
        </div>
      </div>

      <div className="bg-gradient-to-b from-green-900/20 to-green-800/20 border border-green-700/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <h4 className="text-lg font-semibold text-white">Visitas nos últimos 7 dias</h4>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-green-500/30"></div>
            ))}
          </div>

          <div className="relative flex items-end justify-between h-40 gap-2">
            {visitData.map((day, index) => {
              const height = day.count > 0 ? Math.max((day.count / maxValue) * 100, 8) : 0;

              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-8 sm:w-10 bg-gradient-to-t from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 transition-all duration-300 rounded-t-lg relative group-hover:shadow-lg group-hover:shadow-green-500/30"
                      style={{ height: `${height}%` }}
                      title={`${day.count} visitas em ${day.label}`}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-800 text-green-100 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        {day.count} visitas
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <div className="text-xs text-green-200 font-medium">{day.label}</div>
                    <div className="text-xs text-green-300 mt-1">{day.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {visitData.every((d) => d.count === 0) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-green-400/50 mx-auto mb-3" />
              <p className="text-green-200/70 text-sm">Nenhuma visita registrada neste período</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
