import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordVisit } from "../../services/visitorAnalyticsService";

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const lastVisitData = localStorage.getItem("lastVisitedPath");
    const now = new Date().getTime();
    let shouldRecordVisit = true;

    if (lastVisitData) {
      try {
        const { path, timestamp } = JSON.parse(lastVisitData);

        if (path === currentPath && now - timestamp < 30 * 60 * 1000) {
          shouldRecordVisit = false;
        }
      } catch (error) {
        console.error("Ocorreu um erro ao tentar processar os dados de registro de visita.", error);
      }
    }

    if (shouldRecordVisit) {
      recordVisit(currentPath);
      localStorage.setItem(
        "lastVisitedPath",
        JSON.stringify({
          path: currentPath,
          timestamp: now,
        })
      );
    }
  }, [location]);

  return null;
}
