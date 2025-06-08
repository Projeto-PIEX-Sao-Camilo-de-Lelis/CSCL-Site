import { useState, useEffect } from "react";
import { getVisitorsByDate } from "../../services/visitorAnalyticsService";

export default function VisitorChart() {
  const [visitData, setVisitData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDateForAPI = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);

        const formattedStartDate = formatDateForAPI(startDate);
        const formattedEndDate = formatDateForAPI(endDate);

        console.log(`Buscando dados de: ${formattedStartDate} até: ${formattedEndDate}`);

        const data = await getVisitorsByDate(formattedStartDate, formattedEndDate);
        console.log("Dados recebidos da API:", data);

        const processedData = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);

          const apiDateFormat = formatDateForAPI(date);
          const dateStr = date.toISOString().split("T")[0];

          processedData.push({
            date: dateStr,
            count: data[dateStr] || data[apiDateFormat] || 0,
            label: new Date(dateStr).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            }),
          });
        }

        console.log("Dados processados:", processedData);
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
  console.log("Valor máximo para escala:", maxValue);

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
