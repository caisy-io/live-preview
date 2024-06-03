import livePreviewJavascript from "@caisy/live-preview-javascript";
import React from "react";
const { useEffect } = React;

const CaisyConnectionIndicator: React.FC<{
  i18n: {
    descriptionConnected?: string;
    descriptionReconnecting?: string;
    descriptionDisconnected?: string;
    livePreviewConnected?: string;
    livePreviewReconnecting?: string;
    livePreviewDisconnected?: string;
  };
}> = ({ i18n }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { observer, connectionIndicator } =
      livePreviewJavascript.createCaisyConnectionIndicator({ i18n });

    document.body.append(connectionIndicator);

    return () => {
      observer.disconnect();
      connectionIndicator.remove();
    };
  }, []);

  return null;
};

export default CaisyConnectionIndicator;
