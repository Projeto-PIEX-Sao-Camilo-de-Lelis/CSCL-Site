import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordVisit } from "../../services/visitorAnalyticsService";

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const lastVisitData = localStorage.getItem("lastVisitorRecord");
    const now = new Date();
    const today = now.toLocaleDateString();
    let shouldRecordVisit = true;

    if (lastVisitData) {
      try {
        const { date } = JSON.parse(lastVisitData);

        if (date === today) {
          shouldRecordVisit = false;
        }
      } catch (error) {
        console.error("Ocorreu um erro ao processar os dados de registro de visita.", error);
      }
    }

    if (shouldRecordVisit) {
      recordVisit(location.pathname);
      localStorage.setItem(
        "lastVisitorRecord",
        JSON.stringify({
          date: today,
          timestamp: now.getTime(),
          path: location.pathname,
        })
      );
    }
  }, []);

  return null;
}
