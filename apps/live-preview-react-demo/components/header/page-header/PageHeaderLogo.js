"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeaderLogo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const link_1 = __importDefault(require("next/link"));
const PageHeaderLogo = ({ logo, logoDark }) => {
    const logoLive = (0, useCaisyUpdates_1.useCaisyUpdates)(logo);
    const logoDarkVersionLive = (0, useCaisyUpdates_1.useCaisyUpdates)(logoDark);
    if (!logoLive?.src) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/", legacyBehavior: true, children: (0, jsx_runtime_1.jsxs)("a", { children: [(0, jsx_runtime_1.jsx)("img", { src: logoLive.src, alt: "Logo" }), logoDarkVersionLive?.src && ((0, jsx_runtime_1.jsx)("img", { src: logoDarkVersionLive?.src, alt: "Logo" }))] }) }));
};
exports.PageHeaderLogo = PageHeaderLogo;
