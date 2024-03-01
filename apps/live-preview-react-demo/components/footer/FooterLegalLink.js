"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterLegalLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const FooterLegalLink = ({ homePageSlug, ...props }) => {
    const el = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    const link = (0, useCaisyUpdates_1.useCaisyUpdates)(props?.link?.[0]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(link_1.default, { ...(el?.url
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                }
                : {}), href: el.__typename == "CompButtonExternalLinks" && el?.url
                ? el.url
                : `/${(link?.__typename === "Page" &&
                    (link?.slug === homePageSlug ? "" : link?.slug ?? "#")) ??
                    ""}`, children: el.title ?? "" }) }));
};
exports.FooterLegalLink = FooterLegalLink;
