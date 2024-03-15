import { createCaisyConnectionIndicator } from "@nicolasshiken/live-preview-javascript/createCaisyConnectionIndicator";
import { FC, useEffect } from "react";
import "@nicolasshiken/live-preview-javascript/indicatorStyles";
import "@nicolasshiken/live-preview-javascript/styles";

export const CaisyConnectionIndicator: FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { observer, connectionIndicator } = createCaisyConnectionIndicator();

    document.body.append(connectionIndicator);

    return () => {
      observer.disconnect();
      connectionIndicator.remove();
    };
  }, []);

  return null;
};
