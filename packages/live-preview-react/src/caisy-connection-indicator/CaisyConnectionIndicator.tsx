import livePreviewJavascript from "@caisy/live-preview-javascript";
import React from "react";
const { useEffect } = React;

const CaisyConnectionIndicator: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { observer, connectionIndicator } =
      livePreviewJavascript.createCaisyConnectionIndicator();

    document.body.append(connectionIndicator);

    return () => {
      observer.disconnect();
      connectionIndicator.remove();
    };
  }, []);

  return null;
};

export default CaisyConnectionIndicator;
