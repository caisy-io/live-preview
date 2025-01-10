import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {livePreviewQwik} from "./qwik";

export interface BaseProps {
    previewToken: string;
    projectId: string;
}

export const useCaisyLivePreview = <T extends BaseProps>(props: T) => {
    const previewToken = useSignal<string | null>(null);
    const xlocale = "en";
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        const w = typeof window === "undefined" ? null : window;
        if (!w) return;

        const queryString = w.location.search;
        const urlParams = new URLSearchParams(queryString);
        const caisy_preview_access_token = urlParams.get("caisy_preview_access_token");

        if (caisy_preview_access_token) {
            previewToken.value = caisy_preview_access_token as string;
            localStorage.setItem("caisy_preview_access_token", caisy_preview_access_token as string);
        } else {
            const localToken = localStorage.getItem("caisy_preview_access_token");
            if (!localToken) {
                return;
            }
            previewToken.value = localToken;
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        if (typeof window === "undefined") return;
        if (!previewToken.value) return;
        // const getCaisyDraftMode = () => {
        //     const key = "caisy_draft_mode";
        //     const keyValue = document?.cookie?.match?.("(^|;) ?" + key + "=([^;]*)(;|$)");
        //     return keyValue ? keyValue[2] : null;
        // };

        let close: any = null;

        const start = async () => {
            const token = previewToken.value;

            if (!token) return;

            close = livePreviewQwik.caisyLivePreview({
                projectId: props.projectId,
                token,
                locale: xlocale,
                enabled: true,
                debug: true,
            });
        };

        start();

        return () => {
            close && close();
        };
    });
};
