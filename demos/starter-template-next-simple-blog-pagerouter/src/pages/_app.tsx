import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { Toast } from "../components/Toast";
import { Footer } from "../layouts/Footer";
import { Navigation } from "../layouts/Navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { init } from "@nicolasshiken/live-preview-react/init";
import { ConnectionIndicator } from "@nicolasshiken/live-preview-react/ConnectionIndicator";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(` draftMode`, pageProps.draftMode);
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

        const initLivePreview = { init };

        function getCookie(key) {
          const keyValue = document.cookie.match(
            "(^|;) ?" + key + "=([^;]*)(;|$)"
          );
          return keyValue ? keyValue[2] : null;
        }
        const token = getCookie("caisy_preview_access_token");

        if (!token || `${token}` === "null" || `${token}` === "undefined") {
          return;
        }

        close = initLivePreview.init({
          projectId: process.env.NEXT_PUBLIC_CAISY_PROJECT_ID as string,
          token,
          locale: router.locale,
          enabled: pageProps.draftMode || true,
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
      {pageProps.Navigation && <Navigation {...pageProps.Navigation} />}
      <Component {...pageProps} />
      <ConnectionIndicator />
      {pageProps.Footer && <Footer {...pageProps.Footer} />}
    </>
  );
}
