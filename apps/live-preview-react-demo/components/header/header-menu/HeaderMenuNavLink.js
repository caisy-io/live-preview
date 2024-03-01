"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMenuNavLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const link_1 = __importDefault(require("next/link"));
const SHeaderMenuNavigationElement_1 = require("./styles/SHeaderMenuNavigationElement");
const HeaderMenuNavLink = ({ totalAnimationItems, isOpen, navigationIndex, setIsOpen, homePageSlug, ...props }) => {
    const element = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: element?.slug === homePageSlug
            ? "/"
            : "/" + element?.slug ?? "#", children: (0, jsx_runtime_1.jsx)(SHeaderMenuNavigationElement_1.SHeaderMenuNavigationElement, { isOpen: isOpen, animationIndex: navigationIndex + 1, totalAnimationItems: totalAnimationItems, onClick: () => {
                setIsOpen(false);
            }, children: element.__typename === "Page" && element.internalTitle }) }));
};
exports.HeaderMenuNavLink = HeaderMenuNavLink;
