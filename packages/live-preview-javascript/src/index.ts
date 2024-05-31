import createCaisyConnectionIndicatorInner from "./caisy-connection-indicator/createCaisyConnectionIndicator";
import { caisyLivePreview as caisyLivePreviewInner } from "./caisyLivePreview";
import { default as getCaisyInspectPropsDefault } from "./getCaisyInspectProps";
import { getCaisyToken as getCaisyTokenInner } from "./getCaisyToken";

export { default as createPubSub } from "./pubsub";

export const getCaisyInspectProps = getCaisyInspectPropsDefault;

export const caisyLivePreview = caisyLivePreviewInner;
export const getCaisyToken = getCaisyTokenInner;

export const createCaisyConnectionIndicator =
  createCaisyConnectionIndicatorInner;

export default {
  createCaisyConnectionIndicator,
  getCaisyInspectProps,
  getCaisyToken,
  caisyLivePreview,
};
