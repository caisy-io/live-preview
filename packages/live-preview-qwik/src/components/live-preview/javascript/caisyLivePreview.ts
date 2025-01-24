import { startCollaborationConnection } from "./collaboration/collaborationConnection";
import { globalRef, globalStore } from "./globalstore";
import { startInspectMode } from "./inspect";

export const caisyLivePreview = (settings: {
    projectId: string;
    token: string;
    locale?: string;
    inspectMode?: boolean;
    debug?: boolean;
    namespace?: string;
    enabled?: boolean;
    caisyEndpoint?: string;
    hooks?: {
        onActiveDocumentChange?: (update: any) => void;
    }
}) => {

    if (typeof window !== "undefined") {
        if (!settings){
            console.warn("caisyLivePreview settings is not defined");
            return;
        }
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

        if (typeof settings.hooks?.onActiveDocumentChange === "function") {
            globalStore.pubsub.on("sameUserActiveDocumentChange", settings.hooks.onActiveDocumentChange);
        }

        const inpsectMode = settings.enabled && (settings.inspectMode === false ? false : true);

        window.document.body.setAttribute("data-caisy-inspect-mode", `${inpsectMode}`);

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
