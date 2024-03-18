import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { Toast } from "../components/Toast";
import { Footer } from "../layouts/Footer";
import { Navigation } from "../layouts/Navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { caisyLivePreview } from "@nicolasshiken/live-preview-react/caisyLivePreview";
import { CaisyConnectionIndicator } from "@nicolasshiken/live-preview-react/CaisyConnectionIndicator";
import { getCaisyCookie } from "@nicolasshiken/live-preview-react/getCaisyCookie";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-react/useCaisyUpdates";

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
          token: getCaisyCookie(),
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
      <CaisyConnectionIndicator />
      {liveProps.Footer && <Footer {...liveProps.Footer} />}
    </>
  );
}
