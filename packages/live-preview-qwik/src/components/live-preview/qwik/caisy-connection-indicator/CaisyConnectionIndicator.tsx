import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import livePreviewJavascript from "../../javascript";
const CaisyConnectionIndicator = component$<{
    i18n: {
        descriptionConnected?: string;
        descriptionReconnecting?: string;
        descriptionDisconnected?: string;
        livePreviewConnected?: string;
        livePreviewReconnecting?: string;
        livePreviewDisconnected?: string;
    };
}>(({ i18n }) => {
    useStyles$(
        `[data-caisy-inspect-mode=true] .caisy-connection-indicator-container{display:flex}.caisy-connection-indicator-container{position:fixed;inset:0;pointer-events:none;display:none;align-items:center;justify-content:center;z-index:99999999999!important}.caisy-connection-indicator{overflow:hidden;position:absolute;pointer-events:all;top:calc(100vh - 28px - 48px);border-radius:8px;box-sizing:border-box;background-color:#fff;box-shadow:0 10px 24px 0 rgba(0,0,0,.14);transition:width .3s cubic-bezier(.34, 1.56, .64, 1);height:48px;min-width:230px}.caisy-connection-indicator-header{display:flex;align-items:center;gap:12px;border-bottom:1px solid #e8eff3;padding:12px}.caisy-connection-indicator-description{padding:12px;font-size:14px;font-weight:500;line-height:20px;letter-spacing:-.14px;color:#567a98}.caisy-connection-indicator-icon-drag{cursor:grab;display:flex;align-items:center;justify-content:center}.caisy-connection-indicator-content{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;line-height:16px}.caisy-connection-indicator-content.--connected{color:#35aa17}.caisy-connection-indicator-content.--disconnected{color:#ed3e3e}.caisy-connection-indicator-content.--reconnecting{color:#f7a300}`,
    );
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        if (typeof window === "undefined") return;

        const { observer, connectionIndicator } = livePreviewJavascript.createCaisyConnectionIndicator({ i18n });

        document.body.append(connectionIndicator);

        return () => {
            observer.disconnect();
            connectionIndicator.remove();
        };
    });

    return null;
});

export default CaisyConnectionIndicator;
