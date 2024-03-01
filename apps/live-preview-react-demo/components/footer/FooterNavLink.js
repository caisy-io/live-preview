"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterNavLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const FooterNavLink = ({ homePageSlug, ...props }) => {
    const el = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/${el?.slug == homePageSlug ? "" : el?.slug ?? "#"}`, legacyBehavior: true, children: el?.internalTitle ?? "" }, el?.id));
};
exports.FooterNavLink = FooterNavLink;
