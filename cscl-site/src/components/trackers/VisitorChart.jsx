import { useState, useEffect } from "react";
import { getVisitorsByDate } from "../../services/visitorAnalyticsService";

export default function VisitorChart() {
  const [visitData, setVisitData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

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
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="h-48 flex items-center justify-center">Carregando...</div>;
  }

  const maxValue = Math.max(...visitData.map((d) => d.count), 1);

  return (
    <div className="mt-6 bg-zinc-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4 text-gray-300">Visitas nos últimos 7 dias</h3>

      <div className="flex items-end justify-between h-32 space-x-1">
        {visitData.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-red-400 hover:bg-red-300 transition-all rounded-t"
              style={{
                height: day.count > 0 ? `${Math.max((day.count / maxValue) * 100, 5)}%` : "0",
                minHeight: day.count > 0 ? "8px" : "0",
              }}
              title={`${day.count} visitas em ${day.label}`}
            ></div>
            <div className="text-xs mt-1 text-gray-400">{day.label}</div>
            <div className="text-xs text-gray-300">{day.count > 0 ? day.count : ""}</div>
          </div>
        ))}
      </div>

      {visitData.every((d) => d.count === 0) && (
        <div className="text-center text-gray-400 text-sm mt-2">
          Nenhuma visita registrada neste período
        </div>
      )}
    </div>
  );
}
