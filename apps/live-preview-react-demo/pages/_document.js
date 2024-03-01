"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = require("styled-components");
const document_1 = __importStar(require("next/document"));
const renderCustomHtmlElements_1 = require("../utils/helpers/renderCustomHtmlElements");
class MyDocument extends document_1.default {
    static async getInitialProps(ctx) {
        const sheet = new styled_components_1.ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles((0, jsx_runtime_1.jsx)(App, { ...props })),
            });
            const initialProps = await document_1.default.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [initialProps.styles, sheet.getStyleElement()] })),
            };
        }
        finally {
            sheet.seal();
        }
    }
    render() {
        return ((0, jsx_runtime_1.jsxs)(document_1.Html, { children: [(0, jsx_runtime_1.jsx)(document_1.Head, {}), (0, jsx_runtime_1.jsxs)("body", { children: [this.props?.__NEXT_DATA__?.props?.pageProps?.universalText
                            ?.customHtmlBody &&
                            (0, renderCustomHtmlElements_1.renderCustomHtmlElements)(this.props.__NEXT_DATA__.props.pageProps.universalText
                                .customHtmlBody), (0, jsx_runtime_1.jsx)(document_1.Main, {}), (0, jsx_runtime_1.jsx)(document_1.NextScript, {})] })] }));
    }
}
exports.default = MyDocument;
