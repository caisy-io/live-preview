"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMenuLegalLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const link_1 = __importDefault(require("next/link"));
const SHeaderMenuImprintElement_1 = require("./styles/SHeaderMenuImprintElement");
const HeaderMenuLegalLink = ({ setIsOpen, homePageSlug, ...props }) => {
    const legalSec = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    const link = (0, useCaisyUpdates_1.useCaisyUpdates)(legalSec?.link?.[0]);
    return ((0, jsx_runtime_1.jsx)(link_1.default, { ...(legalSec?.url
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
            }
            : {}), href: legalSec.__typename == "CompButtonExternalLinks" && legalSec?.url
            ? legalSec.url
            : `/${(link?.__typename === "Page" &&
                (link?.slug === homePageSlug ? "" : link?.slug ?? "#")) ??
                ""}`, children: (0, jsx_runtime_1.jsx)(SHeaderMenuImprintElement_1.SHeaderMenuImprintElement, { onClick: () => {
                setIsOpen(false);
            }, children: legalSec.title ?? "" }) }));
};
exports.HeaderMenuLegalLink = HeaderMenuLegalLink;
