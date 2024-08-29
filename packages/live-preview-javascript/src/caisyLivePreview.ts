import { createPubSub } from "./pubsub";
import { startInspectMode } from "./inspect";
import { startCollaborationConnection } from "./collaboration/collaborationConnection";

const globalRef =
  (typeof window !== "undefined" && (window as any).c) ||
  (typeof window !== "undefined" &&
    ((window as any)["c"] = {}) &&
    (window as any).c) ||
  ({} as any);

const globalStore = globalRef["preview"] || (globalRef["preview"] = {});

globalStore["subscribers"] = globalStore["subscribers"] || new Map();

if (!globalStore["pubsub"]) {
  globalStore["pubsub"] = createPubSub();
}


export const caisyLivePreview = (settings: {
    projectId: string;
    token: string;
    locale?: string;
    inspectMode?: boolean;
    debug?: boolean;
    namespace?: string;
    enabled?: boolean;
    caisyEndpoint?: string;
  }) => {
    if (typeof window !== "undefined") {
      const { token } = settings;
  
      if (!token || `${token}` === "null" || `${token}` === "undefined") {
        return;
      }
  
      const locale = settings.locale || "en";
      if (globalRef) {
        globalRef.debug = settings.debug;
      }
  
      if (globalStore["defaultlocale"]) {
        globalStore["defaultlocale"] = locale;
        globalStore.pubsub.emit("localeChange", [locale]);
      } else {
        globalStore["defaultlocale"] = locale;
      }
  
      const inpsectMode =
        settings.enabled && (settings.inspectMode === false ? false : true);
  
      window.document.body.setAttribute(
        "data-caisy-inspect-mode",
        `${inpsectMode}`
      );
  
      if (inpsectMode && settings.enabled) {
        const cleanUpCollab = startCollaborationConnection({
          projectId: settings.projectId,
          token: settings.token,
          caisyEndpoint: settings.caisyEndpoint,
        });
        const closeInspectMode = startInspectMode({
          locale,
          projectId: settings.projectId,
        });
        return () => {
          closeInspectMode();
          cleanUpCollab?.();
        };
      }
  
      return () => {};
    }
  };