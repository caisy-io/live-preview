import livePreviewJavascript from "@caisy/live-preview-javascript";
import CaisyConnectionIndicatorInner from "./caisy-connection-indicator/CaisyConnectionIndicator";
import { useCaisyUpdates } from "./useCaisyUpdates";

export const CaisyConnectionIndicator = CaisyConnectionIndicatorInner;
export const caisyLivePreview = livePreviewJavascript.caisyLivePreview;
export const getCaisyInspectProps = livePreviewJavascript.getCaisyInspectProps;
export const getCaisyToken = livePreviewJavascript.getCaisyToken;

export { useCaisyUpdates };

const livePreviewReact = {
  useCaisyUpdates,
  CaisyConnectionIndicator,
  caisyLivePreview,
  getCaisyInspectProps,
  getCaisyToken,
};

export default livePreviewReact;
