"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SHeaderGlobalStyle_1 = require("../styles/SHeaderGlobalStyle");
const SHeaderMenu_1 = require("./styles/SHeaderMenu");
const SHeaderMenuImprint_1 = require("./styles/SHeaderMenuImprint");
const SHeaderMenuMainNavigation_1 = require("./styles/SHeaderMenuMainNavigation");
const HeaderMenuNavLink_1 = require("./HeaderMenuNavLink");
const HeaderMenuLegalLink_1 = require("./HeaderMenuLegalLink");
const HeaderMenu = ({ navigation, legalSection, isOpen, homePageSlug, setIsOpen }) => {
    return ((0, jsx_runtime_1.jsx)(SHeaderMenu_1.SHeaderMenu, { isOpen: isOpen, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SHeaderMenuMainNavigation_1.SHeaderMenuMainNavigation, { children: navigation?.mainNavigation?.map((element, navigationIndex) => element?.id && ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(HeaderMenuNavLink_1.HeaderMenuNavLink, { totalAnimationItems: (navigation?.mainNavigation?.length || 0) + 1, isOpen: isOpen, navigationIndex: navigationIndex, setIsOpen: setIsOpen, homePageSlug: homePageSlug, ...element }) }, element.id))) }), (0, jsx_runtime_1.jsx)(SHeaderMenuImprint_1.SHeaderMenuImprint, { isOpen: isOpen, animationIndex: (navigation?.mainNavigation?.length - 1 || 0) + 1, totalAnimationItems: (navigation?.mainNavigation?.length || 0) + 1, children: legalSection?.map((legalSec) => legalSec?.id &&
                        legalSec.title && ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(HeaderMenuLegalLink_1.HeaderMenuLegalLink, { setIsOpen: setIsOpen, homePageSlug: homePageSlug, ...legalSec }) }, legalSec.id))) }), isOpen && (0, jsx_runtime_1.jsx)(SHeaderGlobalStyle_1.SHeaderGlobalStyle, {})] }) }));
};
exports.HeaderMenu = HeaderMenu;
