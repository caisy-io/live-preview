import { createConnectionIndicator } from "@nicolasshiken/live-preview-javascript/createConnectionIndicator";
import { FC, useEffect } from "react";
import "@nicolasshiken/live-preview-javascript/indicatorStyles";
import "@nicolasshiken/live-preview-javascript/styles";

export const ConnectionIndicator: FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { observer, connectionIndicator } = createConnectionIndicator();

    document.body.append(connectionIndicator);

    return () => {
      observer.disconnect();
      connectionIndicator.remove();
    };
  }, []);

  return null;
};
