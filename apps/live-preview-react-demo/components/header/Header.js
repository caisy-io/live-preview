"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const HeaderMenu_1 = require("./header-menu/HeaderMenu");
const PageHeader_1 = require("./page-header/PageHeader");
const SHeader_1 = require("./styles/SHeader");
const Header = ({ firstCompoentHeight, homePageSlug, ...props }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(SHeader_1.SHeader, { children: [(0, jsx_runtime_1.jsx)(PageHeader_1.PageHeader, { homePageSlug: homePageSlug, firstCompoentHeight: firstCompoentHeight, isOpen: isOpen, setIsOpen: setIsOpen, navigation: { ...props } }), (0, jsx_runtime_1.jsx)(HeaderMenu_1.HeaderMenu, { homePageSlug: homePageSlug, isOpen: isOpen, setIsOpen: setIsOpen, legalSection: props.legalSection, navigation: { ...props } })] }));
};
exports.Header = Header;
