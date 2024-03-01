"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const head_1 = __importDefault(require("next/head"));
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const global_style_1 = require("../constants/styles/global-style");
const universalText_1 = require("../provider/universalText");
const renderCustomHtmlElements_1 = require("../utils/helpers/renderCustomHtmlElements");
// import "@repo/live-preview-react/lib/live-preview/inspect/styles.css";
// import "@repo/live-preview-react/lib/live-preview/connection-indicator/styles.css";
require("@repo/live-preview-react/styles");
require("@repo/live-preview-react/indicatorStyles");
const ConnectionIndicator_1 = require("@repo/live-preview-react/ConnectionIndicator");
const init_1 = require("@repo/live-preview-react/init");
function hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return ("rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            "," +
            alpha +
            ")");
    }
    return "";
}
function App({ Component, pageProps }) {
    const router = (0, router_1.useRouter)();
    // React.useEffect(() => {
    //   // to fix Lazyload bug "you need to scroll to show images at the top of the page"
    //   typeof window != "undefined" && setTimeout(forceCheck, 0);
    // }, [router.asPath]);
    // React.useEffect(() => {
    //   if (typeof window != "undefined") {
    //     // to fix Lazyload bug "you need to scroll to show images at the top of the page"
    //     setTimeout(forceCheck, 1000);
    //   }
    // }, []);
    react_1.default.useEffect(() => {
        console.log(` draftMode`, pageProps.draftMode);
        if (!pageProps.draftMode)
            return;
        if (typeof window != "undefined") {
            let close = undefined;
            (async () => {
                const debug = localStorage.getItem("debug_caisy_preview") === "true";
                if (window?.c?.preview?.defaultLocale) {
                    debug &&
                        console.log(` (window as any)?.c?.preview?.defaultLocale`, window?.c?.preview?.defaultLocale);
                    if (window?.c?.preview?.defaultLocale !== router.locale) {
                        window.location.reload();
                    }
                    return;
                }
                const initLivePreview = { init: init_1.init };
                function getCookie(key) {
                    const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
                    return keyValue ? keyValue[2] : null;
                }
                const token = getCookie("caisy_preview_access_token");
                if (!token || `${token}` === "null" || `${token}` === "undefined") {
                    return;
                }
                close = initLivePreview.init({
                    projectId: process.env.NEXT_PUBLIC_CAISY_PROJECT_ID,
                    token,
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
    const { Page: page } = pageProps;
    const meta = {
        title: page?.metaTitle || "",
        description: page?.metaDescription || "",
        keywords: page?.metaKeywords || "",
        metaImage: page?.featuredImage?.[0],
    };
    const primaryColor = pageProps.universalText?.primaryColor;
    const secondaryColor = pageProps.universalText?.secondaryColor;
    const primaryColor100 = primaryColor && hexToRgbA(primaryColor, "1")
        ? hexToRgbA(primaryColor, "1")
        : "rgba(29,0,84,1)";
    const primaryColor80 = primaryColor && hexToRgbA(primaryColor, "0.8")
        ? hexToRgbA(primaryColor, "0.8")
        : "rgba(29,0,84,0.800)";
    const secondayColor100 = secondaryColor && hexToRgbA(secondaryColor, "1")
        ? hexToRgbA(secondaryColor, "1")
        : "rgba(80,100,180,1)";
    const secondayColor80 = secondaryColor && hexToRgbA(secondaryColor, "0.8")
        ? hexToRgbA(secondaryColor, "0.8")
        : "rgba(80,100,180,0.800)";
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(head_1.default, { children: [pageProps?.universalText?.customHtml &&
                        (0, renderCustomHtmlElements_1.renderCustomHtmlElements)(pageProps.universalText.customHtml), (0, jsx_runtime_1.jsx)("title", { children: meta.title || "Demo" }), meta.title && (0, jsx_runtime_1.jsx)("meta", { name: "title", content: meta.title }), meta.description && ((0, jsx_runtime_1.jsx)("meta", { name: "description", content: meta.description })), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "*" }), (0, jsx_runtime_1.jsx)("link", { href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700&family=Roboto:wght@300;400;500;600;700&display=swap", rel: "stylesheet" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no" }), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }), (0, jsx_runtime_1.jsx)("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }), (0, jsx_runtime_1.jsx)("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }), (0, jsx_runtime_1.jsx)("link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }), (0, jsx_runtime_1.jsx)("link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }), (0, jsx_runtime_1.jsx)("link", { rel: "manifest", href: "/site.webmanifest" }), (0, jsx_runtime_1.jsx)("meta", { name: "msapplication-TileColor", content: "#da532c" }), (0, jsx_runtime_1.jsx)("meta", { name: "theme-color", content: "#ffffff" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:type", content: "website" }), (0, jsx_runtime_1.jsx)("meta", { property: "twitter:card", content: "summary" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:title", content: meta.title || "demo-project-42.vercel.app" }), (0, jsx_runtime_1.jsx)("meta", { property: "twitter:title", content: meta.title || "demo-project-42.vercel.app" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:description", content: meta.description }), (0, jsx_runtime_1.jsx)("meta", { property: "twitter:description", content: meta.description }), (0, jsx_runtime_1.jsx)("meta", { property: "og:url", content: "https://demo-project-42.vercel.app/" +
                            router.locale +
                            router.asPath }), (0, jsx_runtime_1.jsx)("meta", { property: "twitter:url", content: "https://demo-project-42.vercel.app/" +
                            router.locale +
                            router.asPath }), meta.metaImage && meta.metaImage.src && ((0, jsx_runtime_1.jsx)("meta", { property: "og:image", content: meta.metaImage.src + "?w=1200&h=627" })), meta.metaImage && meta.metaImage.src && ((0, jsx_runtime_1.jsx)("meta", { property: "twitter:image", content: meta.metaImage.src + "?w=1200&h=627" })), (0, jsx_runtime_1.jsx)("meta", { property: "og:image:alt", content: meta.metaImage?.title ? meta.metaImage.title : "Demo projectimage" }), (0, jsx_runtime_1.jsx)("meta", { property: "twitter:image:alt", content: meta.metaImage?.title ? meta.metaImage.title : "Demo project image" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:locale", content: `${router?.locale?.toLowerCase?.()}_${router?.locale?.toUpperCase?.()}` }), router &&
                        router.locales?.map((l) => {
                            if (l === router.locale) {
                                return null;
                            }
                            return ((0, jsx_runtime_1.jsx)("meta", { property: "og:locale:alternate", content: `${l.toLowerCase()}_${l.toUpperCase()}` }, `${l.toLowerCase()}_${l.toUpperCase()}`));
                        })] }), (0, jsx_runtime_1.jsx)(global_style_1.GSBase, { primaryColor100: primaryColor100, primaryColor80: primaryColor80, secondayColor100: secondayColor100, secondayColor80: secondayColor80 }), (0, jsx_runtime_1.jsxs)(universalText_1.UniversalTextProvider, { universalText: pageProps.universalText, children: [(0, jsx_runtime_1.jsx)(Component, { ...pageProps }), (0, jsx_runtime_1.jsx)(ConnectionIndicator_1.ConnectionIndicator, {})] })] }));
}
exports.default = App;
