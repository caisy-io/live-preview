
import livePreviewJavascript from "@caisy/live-preview-javascript";
import CaisyConnectionIndicatorInner  from "./caisy-connection-indicator/CaisyConnectionIndicator";
import {useCaisyUpdates} from "./useCaisyUpdates";

export { isEqual, set} from "./helper"
export {createPubSub} from "./pubsub"
export { globalStore } from "./globalStore";

export const CaisyConnectionIndicator = CaisyConnectionIndicatorInner;
export const caisyLivePreview = livePreviewJavascript.caisyLivePreview;
export const getCaisyInspectProps = livePreviewJavascript.getCaisyInspectProps;
export const getCaisyToken = livePreviewJavascript.getCaisyToken;

import "./caisy-connection-indicator/caisy-connection-indicator.css"

export { useCaisyUpdates }

const livePreviewReact = {
  useCaisyUpdates,
  CaisyConnectionIndicator,
  caisyLivePreview,
  getCaisyInspectProps,
  getCaisyToken,
};

export default livePreviewReact;