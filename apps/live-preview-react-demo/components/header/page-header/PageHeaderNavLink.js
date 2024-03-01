"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeaderNavLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const link_1 = __importDefault(require("next/link"));
const SPageHeaderLinkElement_1 = require("./styles/SPageHeaderLinkElement");
const PageHeaderNavLink = ({ whiteMode, homePageSlug, ...props }) => {
    const link = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    if (!link?.id) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(SPageHeaderLinkElement_1.SPageHeaderLinkElement, { whiteMode: whiteMode, children: (0, jsx_runtime_1.jsx)(link_1.default, { legacyBehavior: true, href: link.__typename === "Page" &&
                (link?.slug === homePageSlug
                    ? "/"
                    : `/${link?.slug ?? "#noslugincaisy"}`), children: (0, jsx_runtime_1.jsx)("a", { children: (link.__typename === "Page" && link?.internalTitle) ?? "" }) }) }));
};
exports.PageHeaderNavLink = PageHeaderNavLink;
