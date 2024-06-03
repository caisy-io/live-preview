import "@/styles/globals.css";
import "@caisy/live-preview-javascript/inpsect";
import "@caisy/live-preview-javascript/connectionIndicator";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { Toast } from "../components/Toast";
import { Footer } from "../layouts/Footer";
import { Navigation } from "../layouts/Navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { CaisyConnectionIndicator } from "@caisy/live-preview-react";
import { getCaisyToken } from "@caisy/live-preview-react";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import { caisyLivePreview } from "@caisy/live-preview-react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const liveProps = useCaisyUpdates(pageProps);

  useEffect(() => {
    // console.log(` draftMode`, pageProps.draftMode);
    if (!pageProps.draftMode) return;

    if (typeof window != "undefined") {
      let close: any = undefined;
      (async () => {
        const debug = localStorage.getItem("debug_caisy_preview") === "true";
        if ((window as any)?.c?.preview?.defaultLocale) {
          debug &&
            console.log(
              ` (window as any)?.c?.preview?.defaultLocale`,

              (window as any)?.c?.preview?.defaultLocale
            );
          if ((window as any)?.c?.preview?.defaultLocale !== router.locale) {
            window.location.reload();
          }
          return;
        }

        close = caisyLivePreview({
          projectId: process.env.NEXT_PUBLIC_CAISY_PROJECT_ID as string,
          token: getCaisyToken(),
          locale: router.locale,
          enabled: pageProps.draftMode,
          debug,
        });
      })();

      return () => {
        close && close();
      };
    }
  }, [router.locale]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      {/* {process.env.NEXT_PUBLIC_SHOW_ONBOARDING_TOAST != "false" && <Toast />} */}
      {liveProps.Navigation && <Navigation {...liveProps.Navigation} />}
      <Component {...liveProps} />
      <CaisyConnectionIndicator
        i18n={{
          descriptionConnected: "Connected to the preview server test",
          descriptionReconnecting:
            "Connected to the preview server, but there is no active caisy window to connect to test",
          descriptionDisconnected:
            "Your connection has timed out, to continue restart the preview in <strong>caisy</strong> test",
          livePreviewConnected: "Live Preview Connected test",
          livePreviewReconnecting: "Live Preview Reconnecting test",
          livePreviewDisconnected: "Live Preview Disconnected test",
        }}
      />
      {liveProps.Footer && <Footer {...liveProps.Footer} />}
    </>
  );
}
