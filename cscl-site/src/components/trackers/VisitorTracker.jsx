import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { recordVisit } from "../../services/visitorAnalyticsService";

export default function VisitorTracker() {
  const location = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath !== previousPath.current) {
      recordVisit(currentPath);
      previousPath.current = currentPath;
    }
  }, [location]);

  return null;
}
